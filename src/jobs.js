const fs = require("node:fs");
const path = require("node:path");

function jobsDir(root) {
  return path.join(root, "factory", "jobs");
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

function createJob(root, title) {
  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error("A job title is required.");
  }

  const id = `${String(nextJobNumber(root)).padStart(3, "0")}-${slugify(trimmed)}`;
  const dir = path.join(jobsDir(root), id);
  fs.mkdirSync(dir, { recursive: true });

  const now = new Date().toISOString();
  const job = {
    id,
    title: trimmed,
    status: "requested",
    createdAt: now,
    updatedAt: now,
  };

  const templatePath = path.join(root, "factory", "templates", "request.md");
  const template = fs.existsSync(templatePath)
    ? fs.readFileSync(templatePath, "utf8")
    : "# Request\n\n";

  fs.writeFileSync(path.join(dir, "job.json"), `${JSON.stringify(job, null, 2)}\n`);
  fs.writeFileSync(path.join(dir, "request.md"), template);
  return job;
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
  listJobs,
  nextJobNumber,
  slugify,
};
