const fs = require("node:fs");
const path = require("node:path");
// fs is used by loadConfig

const { createJob, findJob, listJobs, markReady, setJobStatus } = require("./jobs");
const { loadRoles } = require("./roles");

function loadConfig(root) {
  const configPath = path.join(root, "factory", "config.json");
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function nextRole(config, status) {
  return config.statuses[status] ?? null;
}

function formatNext(next) {
  if (!next) {
    return "done";
  }
  if (next === "grokbot") {
    return "next: grokbot (manager)";
  }
  return `next: ${next}`;
}

function formatRoles(roles) {
  const lines = [
    "Cursor workers:",
    "",
  ];
  for (const role of roles) {
    lines.push(`- ${role.id}: ${role.description}`);
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
    lines.push(`- ${job.id}  [${job.status}]  ${formatNext(nextRole(config, job.status))}`);
    lines.push(`  ${job.title}`);
  }
  return lines.join("\n");
}

function buildPrompt(role, job, config) {
  const next = nextRole(config, job.status);
  const note =
    next && next !== role.id
      ? `This job is currently waiting for ${next === "grokbot" ? "a Grok bot" : next}. Continue only if you were asked to take over.`
      : `This job is ready for ${role.id}.`;

  return [
    `You are a SoftwareFactory worker (${role.id}). A Grok bot is the manager.`,
    "",
    `Job: ${job.id}`,
    `Title: ${job.title}`,
    `Status: ${job.status}`,
    note,
    "",
    `Follow ${role.file}.`,
    `Work in factory/jobs/${job.id}/.`,
    "Read the Grok bot brief. Do not invent requirements.",
    "Read AGENTS.md before you start.",
    "",
    role.prompt,
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

function setStatus(root, status, jobId, config) {
  if (!status || !Object.prototype.hasOwnProperty.call(config.statuses, status)) {
    throw new Error(
      `Unknown status "${status || ""}". Known statuses: ${knownStatuses(config).join(", ")}`,
    );
  }
  if (status === "accepted") {
    throw new Error("Accepted is a manager decision. Run: npm start -- accept [job-id]");
  }
  if (status === "draft") {
    throw new Error("draft is set by new-job.");
  }
  if (status === "briefed") {
    throw new Error("Use ready to mark a brief finished. Run: npm start -- ready [job-id]");
  }

  const job = requireJob(root, jobId);
  const sources = STATUS_SOURCES[status];
  if (!sources || !sources.includes(job.status)) {
    const allowed = targetsFrom(job.status);
    const hint = allowed.length > 0 ? allowed.join(", ") : "none";
    throw new Error(
      `Cannot set ${job.id} to ${status} from ${job.status}. From ${job.status} you can set: ${hint}.`,
    );
  }

  const next = setJobStatus(root, job.id, status);
  return [`Job ${next.id} status is ${next.status}.`, formatNext(nextRole(config, next.status))].join("\n");
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
    "SoftwareFactory — Grok bots manage. Cursor agents build, test, and check.",
    "",
    "You start every step by hand.",
    "",
    "Usage:",
    "  npm start -- roles",
    "  npm start -- new-job \"Add a notes API\"",
    "  npm start -- ready [job-id]",
    "  npm start -- set-status <status> [job-id]",
    "  npm start -- accept [job-id]",
    "  npm start -- status",
    "  npm start -- prompt <builder|tester|security|ui> [job-id]",
    "",
    "Pipeline: grokbot → builder → tester → security → ui → grokbot",
    "Workers record status with set-status. A Grok bot accepts from ui-checked.",
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
    const [status, jobId] = rest;
    return setStatus(root, status, jobId, config);
  }

  if (command === "accept") {
    return acceptJob(root, rest[0]);
  }

  if (command === "prompt") {
    const [roleId, jobId] = rest;
    const role = roles.find((item) => item.id === roleId);
    if (!role) {
      throw new Error(
        `Unknown worker "${roleId || ""}". Cursor workers are: ${roles.map((item) => item.id).join(", ")}`,
      );
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

module.exports = { acceptJob, buildPrompt, helpText, main, nextRole, run, setStatus };
