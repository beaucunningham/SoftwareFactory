const fs = require("node:fs");
const path = require("node:path");

const { createJob, findJob, listJobs } = require("./jobs");
const { loadRoles } = require("./roles");

function loadConfig(root) {
  const configPath = path.join(root, "factory", "config.json");
  return JSON.parse(fs.readFileSync(configPath, "utf8"));
}

function nextRole(config, status) {
  return config.statuses[status] ?? null;
}

function formatRoles(roles) {
  const lines = ["SoftwareFactory roles:", ""];
  for (const role of roles) {
    lines.push(`- ${role.id}: ${role.description}`);
  }
  return lines.join("\n");
}

function formatStatus(jobs, config) {
  if (jobs.length === 0) {
    return "No jobs yet. Create one with: npm start -- new-job \"Your idea\"";
  }

  const lines = ["Jobs:", ""];
  for (const job of jobs) {
    const next = nextRole(config, job.status);
    const waiting = next ? `next: ${next}` : "done";
    lines.push(`- ${job.id}  [${job.status}]  ${waiting}`);
    lines.push(`  ${job.title}`);
  }
  return lines.join("\n");
}

function buildPrompt(role, job, config) {
  const next = nextRole(config, job.status);
  const note =
    next && next !== role.id
      ? `This job is currently waiting for ${next}. Continue only if you were asked to take over.`
      : `This job is ready for ${role.id}.`;

  return [
    `You are the SoftwareFactory ${role.id}.`,
    "",
    `Job: ${job.id}`,
    `Title: ${job.title}`,
    `Status: ${job.status}`,
    note,
    "",
    `Follow .cursor/agents/${role.id}.md.`,
    `Work in factory/jobs/${job.id}/.`,
    "Read AGENTS.md before you start.",
    "",
    role.prompt,
  ].join("\n");
}

function helpText() {
  return [
    "SoftwareFactory — specialist cloud agents that build quality app code.",
    "",
    "Usage:",
    "  npm start -- roles",
    "  npm start -- new-job \"Add a notes API\"",
    "  npm start -- status",
    "  npm start -- prompt <role> [job-id]",
    "",
    "Pipeline: planner → builder → tester → reviewer",
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
    return `Created job ${job.id}\nNext: edit factory/jobs/${job.id}/request.md\nThen: npm start -- prompt planner ${job.id}`;
  }

  if (command === "status") {
    return formatStatus(listJobs(root), config);
  }

  if (command === "prompt") {
    const [roleId, jobId] = rest;
    const role = roles.find((item) => item.id === roleId);
    if (!role) {
      throw new Error(`Unknown role "${roleId || ""}". Try: npm start -- roles`);
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
