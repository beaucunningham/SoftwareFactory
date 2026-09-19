const fs = require("node:fs");
const path = require("node:path");

function jobsDir(root) {
  return path.join(root, "factory", "jobs");
}

function jobDir(root, jobId) {
  return path.join(jobsDir(root), jobId);
}

function slugify(title) {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return slug || "job";
}

function nextJobNumber(root) {
  const dir = jobsDir(root);
  if (!fs.existsSync(dir)) {
    return 1;
  }

  const numbers = fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => Number.parseInt(entry.name, 10))
    .filter((value) => Number.isInteger(value) && value > 0);

  return numbers.length === 0 ? 1 : Math.max(...numbers) + 1;
}

function writeJob(root, job) {
  const next = { ...job, updatedAt: new Date().toISOString() };
  fs.writeFileSync(path.join(jobDir(root, next.id), "job.json"), `${JSON.stringify(next, null, 2)}\n`);
  return next;
}

function createJob(root, title) {
  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error("A job title is required.");
  }

  const id = `${String(nextJobNumber(root)).padStart(3, "0")}-${slugify(trimmed)}`;
  const dir = jobDir(root, id);
  fs.mkdirSync(dir, { recursive: true });

  const now = new Date().toISOString();
  const job = {
    id,
    title: trimmed,
    status: "draft",
    createdAt: now,
    updatedAt: now,
  };

  const templatePath = path.join(root, "factory", "templates", "brief.md");
  const template = fs.existsSync(templatePath)
    ? fs.readFileSync(templatePath, "utf8")
    : "# Brief\n\n";

  fs.writeFileSync(path.join(dir, "job.json"), `${JSON.stringify(job, null, 2)}\n`);
  fs.writeFileSync(path.join(dir, "brief.md"), template);
  return job;
}

function readBrief(root, jobId) {
  const briefPath = path.join(jobDir(root, jobId), "brief.md");
  if (!fs.existsSync(briefPath)) {
    return "";
  }
  return fs.readFileSync(briefPath, "utf8");
}

function isBriefReady(brief) {
  const hasCriteria = /acceptance criteria/i.test(brief);
  const stillTemplate = /_What should exist|_What did you check|_A concrete check/i.test(brief);
  return hasCriteria && !stillTemplate && brief.trim().length > 80;
}

function markReady(root, jobId) {
  const job = findJob(root, jobId);
  if (!job) {
    throw new Error("No job found. Create one with: npm start -- new-job \"Your idea\"");
  }

  if (!isBriefReady(readBrief(root, job.id))) {
    throw new Error(`Brief is still a draft. A Grok bot must finish factory/jobs/${job.id}/brief.md first.`);
  }

  return writeJob(root, { ...job, status: "briefed" });
}

function readJob(dir) {
  const jobPath = path.join(dir, "job.json");
  if (!fs.existsSync(jobPath)) {
    return null;
  }
  return JSON.parse(fs.readFileSync(jobPath, "utf8"));
}

function listJobs(root) {
  const dir = jobsDir(root);
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => readJob(path.join(dir, entry.name)))
    .filter(Boolean)
    .sort((a, b) => a.id.localeCompare(b.id));
}

function findJob(root, jobId) {
  const jobs = listJobs(root);
  if (!jobId) {
    return jobs.at(-1) || null;
  }
  return jobs.find((job) => job.id === jobId || job.id.startsWith(jobId)) || null;
}

module.exports = {
  createJob,
  findJob,
  isBriefReady,
  listJobs,
  markReady,
  nextJobNumber,
  slugify,
};
