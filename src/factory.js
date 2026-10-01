const fs = require("node:fs");
const path = require("node:path");
// fs is used by loadConfig

const { createJob, findJob, listJobs, markReady, setJobStatus } = require("./jobs");
const { loadRoles } = require("./roles");

// Passing statuses recorded together after the builder session and Lane/Ari review.
const POST_BUILD_CHAIN = ["built", "tested", "secured", "ui-checked"];

function loadConfig(root) {
  const configPath = path.join(root, "factory", "config.json");
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function nextRole(config, status) {
  return config.statuses[status] ?? null;
}

function formatNext(next, status) {
  if (!next) {
    return "done";
  }
  if (next === "grokbot") {
    return "next: grokbot (manager)";
  }
  if (next === "review") {
    return "next: Lane and Ari review the diff";
  }
  if (next === "status-update") {
    return "next: one status update through ui-checked";
  }
  if (next === "builder" && status && status !== "briefed") {
    return "next: builder (follow-up to the same agent)";
  }
  return `next: ${next}`;
}

function formatRoles(roles) {
  const active = roles.filter((role) => !role.retired);
  const retired = roles.filter((role) => role.retired);
  const lines = ["Cursor workers:", ""];
  for (const role of active) {
    lines.push(`- ${role.id}: ${role.description}`);
  }
  if (retired.length > 0) {
    const retiredIds = retired.map((role) => role.id).sort();
    lines.push(
      "",
      `Retired from Job 020: ${retiredIds.join(", ")}. One builder session runs the checks. Lane and Ari review the diff.`,
    );
  }
  lines.push("", "Managers: Grok bots write the brief and accept finished work.");
  return lines.join("\n");
}

function formatStatus(jobs, config) {
  if (jobs.length === 0) {
    return "No jobs yet. Create one with: npm start -- new-job \"Your idea\"";
  }

  const lines = ["Jobs:", ""];
  for (const job of jobs) {
    lines.push(`- ${job.id}  [${job.status}]  ${formatNext(nextRole(config, job.status), job.status)}`);
    lines.push(`  ${job.title}`);
  }
  return lines.join("\n");
}

function waitingFor(next) {
  if (next === "grokbot") {
    return "a Grok bot";
  }
  if (next === "review") {
    return "Lane and Ari to review the diff";
  }
  if (next === "status-update") {
    return "the one post-build status update";
  }
  return next;
}

function buildPrompt(role, job, config) {
  const next = nextRole(config, job.status);
  const note =
    next && next !== role.id
      ? `This job is currently waiting for ${waitingFor(next)}. Continue only if you were asked to take over.`
      : `This job is ready for ${role.id}.`;

  return [
    `You are a SoftwareFactory worker (${role.id}). A Grok bot is the manager.`,
    `Job: ${job.id} (${job.status}). ${note}`,
    `Follow ${role.file}. Do not invent requirements. Do not restate this job in follow-up replies.`,
    "",
    role.prompt,
  ].join("\n");
}

function retiredWorkerMessage(roleId) {
  const lines = [
    `Retired (Job 020, approved 2026-10-01). Do not start a ${roleId} cloud agent.`,
    "One builder (grok-4.7) builds the job and runs npm test in the default TZ, UTC, and Pacific/Auckland, plus tsc --noEmit, in that same session.",
    "Lane (Mobile, including Simulator steps) and Ari review the diff. Fixes are a follow-up to that same builder.",
    "Record built, tested, secured, and ui-checked in one status update and one SoftwareFactory pull request.",
    "Reports cite the builder's in-session results and that review. See AGENTS.md.",
  ];
  if (roleId === "ui") {
    lines.push("UI reports are markdown only. Never screenshots.");
  }
  return lines.join("\n");
}

function followUpPrompt(job) {
  return [
    `Follow-up for the same builder agent on ${job.id}. Do not restate the job.`,
    "Apply the review fix in that session.",
    "Re-run npm test in the default timezone, with TZ=UTC, and with TZ=Pacific/Auckland, and tsc --noEmit.",
    "Report the results in the pull request.",
  ].join("\n");
}

function postBuildChain(from) {
  if (STATUS_SOURCES.built.includes(from)) {
    return POST_BUILD_CHAIN;
  }
  const index = POST_BUILD_CHAIN.indexOf(from);
  if (index >= 0 && index < POST_BUILD_CHAIN.length - 1) {
    return POST_BUILD_CHAIN.slice(index + 1);
  }
  return null;
}

function statusUpdatePrompt(job) {
  const chain = postBuildChain(job.status);
  const command = chain
    ? `npm start -- set-status ${chain.join(" ")} ${job.id}`
    : `No post-build status update from ${job.status}.`;
  return [
    `One SoftwareFactory pull request for ${job.id}. Do not restate the job.`,
    command,
    "Add build.md, test-report.md, security-report.md, and ui-report.md in that same pull request.",
    "Cite the builder's in-session test results and Lane's and Ari's diff review.",
    "UI report is markdown only. Do not hand-edit job.json.",
  ].join("\n");
}

// Who may move a job to each status. draft comes from new-job, briefed from ready, accepted from accept.
const STATUS_SOURCES = {
  built: ["briefed", "test-failed", "security-failed", "ui-failed", "changes-requested"],
  tested: ["built"],
  "test-failed": ["built"],
  secured: ["tested"],
  "security-failed": ["tested"],
  "ui-checked": ["secured"],
  "ui-failed": ["secured"],
  "changes-requested": [
    "briefed",
    "built",
    "tested",
    "test-failed",
    "secured",
    "security-failed",
    "ui-checked",
    "ui-failed",
  ],
};

function knownStatuses(config) {
  return Object.keys(config.statuses);
}

function targetsFrom(status) {
  return Object.entries(STATUS_SOURCES)
    .filter(([, sources]) => sources.includes(status))
    .map(([target]) => target);
}

function requireJob(root, jobId) {
  const job = findJob(root, jobId);
  if (!job) {
    throw new Error("No job found. Create one with: npm start -- new-job \"Your idea\"");
  }
  return job;
}

function splitStatusArgs(rest, config) {
  const known = new Set(knownStatuses(config));
  if (rest.length === 0) {
    return { statuses: [], jobId: undefined };
  }
  const lastIsStatus = known.has(rest[rest.length - 1]);
  return {
    statuses: lastIsStatus ? rest : rest.slice(0, -1),
    jobId: lastIsStatus ? undefined : rest[rest.length - 1],
  };
}

function rejectReservedStatus(status) {
  if (status === "accepted") {
    throw new Error("Accepted is a manager decision. Run: npm start -- accept [job-id]");
  }
  if (status === "draft") {
    throw new Error("draft is set by new-job.");
  }
  if (status === "briefed") {
    throw new Error("Use ready to mark a brief finished. Run: npm start -- ready [job-id]");
  }
}

function setStatus(root, status, jobId, config) {
  const statuses = Array.isArray(status) ? status : [status];
  if (statuses.length === 0 || !statuses[0]) {
    throw new Error(
      `Unknown status "". Known statuses: ${knownStatuses(config).join(", ")}`,
    );
  }

  for (const name of statuses) {
    if (!Object.prototype.hasOwnProperty.call(config.statuses, name)) {
      throw new Error(
        `Unknown status "${name}". Known statuses: ${knownStatuses(config).join(", ")}`,
      );
    }
    rejectReservedStatus(name);
  }

  const job = requireJob(root, jobId);

  if (statuses.length > 1) {
    const chain = postBuildChain(job.status);
    const matches =
      chain &&
      statuses.length === chain.length &&
      statuses.every((name, index) => name === chain[index]);
    if (!matches) {
      const hint = chain ? `npm start -- set-status ${chain.join(" ")} ${job.id}` : "none";
      throw new Error(`Post-build statuses are one update. From ${job.status} run: ${hint}`);
    }
  }

  let current = job.status;
  for (const name of statuses) {
    const sources = STATUS_SOURCES[name];
    if (!sources || !sources.includes(current)) {
      const allowed = targetsFrom(current);
      const hint = allowed.length > 0 ? allowed.join(", ") : "none";
      throw new Error(
        `Cannot set ${job.id} to ${name} from ${current}. From ${current} you can set: ${hint}.`,
      );
    }
    current = name;
  }

  const next = setJobStatus(root, job.id, current);
  const lines = [`Job ${next.id} status is ${next.status}.`];
  if (statuses.length > 1) {
    lines.push(`Recorded ${statuses.join(" → ")} in one status update.`);
  }
  lines.push(formatNext(nextRole(config, next.status), next.status));
  return lines.join("\n");
}

function acceptJob(root, jobId) {
  const job = requireJob(root, jobId);
  if (job.status !== "ui-checked") {
    throw new Error(`Cannot accept ${job.id} from ${job.status}. Status must be ui-checked.`);
  }

  const next = setJobStatus(root, job.id, "accepted");
  return `Job ${next.id} is accepted.`;
}

function helpText() {
  return [
    "SoftwareFactory — Grok bots manage. One Cursor builder (grok-4.7) builds and tests each job.",
    "",
    "You start every step by hand. This flow starts with Job 020.",
    "",
    "Usage:",
    "  npm start -- roles",
    "  npm start -- new-job \"Add a notes API\"",
    "  npm start -- ready [job-id]",
    "  npm start -- prompt <builder|follow-up|status> [job-id]",
    "  npm start -- set-status <status> [job-id]",
    "  npm start -- set-status built tested secured ui-checked [job-id]",
    "  npm start -- accept [job-id]",
    "  npm start -- status",
    "",
    "Pipeline: grokbot → builder → Lane and Ari review → one status update → grokbot",
    "The builder runs npm test in the default TZ, UTC, and Pacific/Auckland, and tsc --noEmit, in that session.",
    "Post-build statuses (built, tested, secured, ui-checked) are one CLI update and one SoftwareFactory pull request.",
    "Read pull request state, mergeability, and CI directly. Finley merges.",
    "Tester, security, and ui cloud agents are retired. A Grok bot accepts from ui-checked.",
  ].join("\n");
}

function run(args, options = {}) {
  const root = options.root || process.cwd();
  const [command, ...rest] = args;

  if (!command || command === "help" || command === "--help") {
    return helpText();
  }

  const config = loadConfig(root);
  const roles = loadRoles(root, config.pipeline);

  if (command === "roles") {
    return formatRoles(roles);
  }

  if (command === "new-job") {
    const title = rest.join(" ").trim();
    const job = createJob(root, title);
    return [
      `Created job ${job.id}`,
      `Next: a Grok bot fills factory/jobs/${job.id}/brief.md`,
      `Then: npm start -- ready ${job.id}`,
      `Then: npm start -- prompt builder ${job.id}`,
      "One builder (grok-4.7) per job. Tester, security, and ui prompts are retired.",
    ].join("\n");
  }

  if (command === "ready") {
    const job = markReady(root, rest[0]);
    return `Job ${job.id} is briefed and ready for the builder.\nNext: npm start -- prompt builder ${job.id}`;
  }

  if (command === "status") {
    return formatStatus(listJobs(root), config);
  }

  if (command === "set-status") {
    const { statuses, jobId } = splitStatusArgs(rest, config);
    return setStatus(root, statuses, jobId, config);
  }

  if (command === "accept") {
    return acceptJob(root, rest[0]);
  }

  if (command === "prompt") {
    const [roleId, jobId] = rest;
    if (roleId === "follow-up" || roleId === "status") {
      const job = findJob(root, jobId);
      if (!job) {
        throw new Error("No job found. Create one with: npm start -- new-job \"Your idea\"");
      }
      return roleId === "follow-up" ? followUpPrompt(job) : statusUpdatePrompt(job);
    }

    const role = roles.find((item) => item.id === roleId);
    if (!role) {
      const active = roles.filter((item) => !item.retired).map((item) => item.id);
      const retired = roles.filter((item) => item.retired).map((item) => item.id);
      const retiredNote = retired.length > 0 ? ` Retired: ${retired.join(", ")}.` : "";
      throw new Error(
        `Unknown worker "${roleId || ""}". Cursor workers are: ${active.join(", ") || "none"}.${retiredNote}`,
      );
    }
    if (role.retired) {
      return retiredWorkerMessage(role.id);
    }
    const job = findJob(root, jobId);
    if (!job) {
      throw new Error("No job found. Create one with: npm start -- new-job \"Your idea\"");
    }
    return buildPrompt(role, job, config);
  }

  throw new Error(`Unknown command "${command}". Try: npm start -- help`);
}

function main(args, options = {}) {
  try {
    const output = run(args, options);
    if (options.print !== false) {
      console.log(output);
    }
    return output;
  } catch (error) {
    if (options.print !== false) {
      console.error(error.message);
    }
    if (options.exit !== false) {
      process.exitCode = 1;
    }
    if (options.rethrow) {
      throw error;
    }
    return null;
  }
}

module.exports = {
  acceptJob,
  buildPrompt,
  helpText,
  main,
  nextRole,
  postBuildChain,
  run,
  setStatus,
};
