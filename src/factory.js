const fs = require("node:fs");
const path = require("node:path");
// fs is used by loadConfig

const { createJob, findJob, listJobs, markReady } = require("./jobs");
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

function helpText() {
  return [
    "SoftwareFactory — Grok bots manage. Cursor agents build and test.",
    "",
    "Usage:",
    "  npm start -- roles",
    "  npm start -- new-job \"Add a notes API\"",
    "  npm start -- ready [job-id]",
    "  npm start -- status",
    "  npm start -- prompt <builder|tester|security|ui> [job-id]",
    "",
    "Pipeline: grokbot → builder → tester → security → ui → grokbot",
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

module.exports = { buildPrompt, helpText, main, nextRole, run };
