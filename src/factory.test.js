const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const test = require("node:test");

const { run } = require("./factory");
const { slugify } = require("./jobs");

const root = path.join(__dirname, "..");

function makeWorkspace() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "software-factory-"));
  fs.cpSync(path.join(root, ".cursor"), path.join(dir, ".cursor"), { recursive: true });
  fs.cpSync(path.join(root, "factory"), path.join(dir, "factory"), { recursive: true });
  return dir;
}

function writeBrief(dir, jobId) {
  fs.writeFileSync(
    path.join(dir, "factory", "jobs", jobId, "brief.md"),
    [
      "# Brief",
      "",
      "## What to build",
      "Add a notes API that can create and list notes.",
      "",
      "## Research",
      "Checked the empty factory CLI. Keep this as a small in-memory module.",
      "",
      "## Acceptance criteria",
      "- [ ] POST creates a note",
      "- [ ] GET lists created notes",
      "",
      "## Out of scope",
      "- Auth",
    ].join("\n"),
  );
}

test("help lists the manager-to-worker pipeline", () => {
  const output = run(["help"], { root });
  assert.match(output, /grokbot → builder → tester → grokbot/);
});

test("roles lists only Cursor workers", () => {
  const output = run(["roles"], { root });
  assert.match(output, /- builder:[\s\S]*- tester:/);
  assert.doesNotMatch(output, /- planner:/);
  assert.doesNotMatch(output, /- reviewer:/);
  assert.match(output, /Grok bots write the brief/);
});

test("new-job waits for a Grok bot brief", () => {
  const dir = makeWorkspace();
  const created = run(["new-job", "Add a notes API"], { root: dir });
  assert.match(created, /001-add-a-notes-api/);
  assert.match(created, /Grok bot fills/);
  assert.equal(
    fs.existsSync(path.join(dir, "factory", "jobs", "001-add-a-notes-api", "brief.md")),
    true,
  );

  const status = run(["status"], { root: dir });
  assert.match(status, /\[draft\]/);
  assert.match(status, /next: grokbot \(manager\)/);
});

test("ready rejects an unfinished brief and accepts a finished one", () => {
  const dir = makeWorkspace();
  run(["new-job", "Add a notes API"], { root: dir });
  assert.throws(() => run(["ready", "001-add-a-notes-api"], { root: dir }), /still a draft/);

  writeBrief(dir, "001-add-a-notes-api");
  const output = run(["ready", "001-add-a-notes-api"], { root: dir });
  assert.match(output, /briefed and ready for the builder/);

  const status = run(["status"], { root: dir });
  assert.match(status, /\[briefed\]/);
  assert.match(status, /next: builder/);
});

test("prompt builds a worker brief and rejects manager roles", () => {
  const dir = makeWorkspace();
  run(["new-job", "Add a notes API"], { root: dir });
  writeBrief(dir, "001-add-a-notes-api");
  run(["ready", "001-add-a-notes-api"], { root: dir });

  const prompt = run(["prompt", "builder", "001-add-a-notes-api"], { root: dir });
  assert.match(prompt, /You are a SoftwareFactory worker \(builder\)/);
  assert.match(prompt, /Grok bot is the manager/);
  assert.match(prompt, /Do not invent requirements/);

  assert.throws(() => run(["prompt", "planner"], { root: dir }), /Unknown worker/);
});

test("unknown command and missing job fail clearly", () => {
  assert.throws(() => run(["ship-it"], { root }), /Unknown command/);
  assert.throws(() => run(["prompt", "builder"], { root }), /No job found/);
});

test("slugify keeps job ids readable", () => {
  assert.equal(slugify("Add a notes API"), "add-a-notes-api");
  assert.equal(slugify("!!!"), "job");
});
