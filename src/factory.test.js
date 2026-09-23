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
  assert.match(output, /grokbot → builder → tester → security → ui → grokbot/);
  assert.match(output, /set-status <status> \[job-id\]/);
  assert.match(output, /accept \[job-id\]/);
  assert.match(output, /new-job/);
  assert.match(output, /ready \[job-id\]/);
  assert.match(output, /prompt <builder\|tester\|security\|ui>/);
});

test("roles lists only Cursor workers", () => {
  const output = run(["roles"], { root });
  assert.match(output, /- builder:[\s\S]*- tester:[\s\S]*- security:[\s\S]*- ui:/);
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
  assert.match(prompt, /set-status built/);

  assert.throws(() => run(["prompt", "planner"], { root: dir }), /Unknown worker/);

  const security = run(["prompt", "security", "001-add-a-notes-api"], { root: dir });
  assert.match(security, /You are a SoftwareFactory worker \(security\)/);
  assert.match(security, /set-status secured/);
  const ui = run(["prompt", "ui", "001-add-a-notes-api"], { root: dir });
  assert.match(ui, /You are a SoftwareFactory worker \(ui\)/);
  assert.match(ui, /set-status ui-checked/);
});

function readJobFile(dir, jobId) {
  return JSON.parse(fs.readFileSync(path.join(dir, "factory", "jobs", jobId, "job.json"), "utf8"));
}

function briefJob(dir) {
  run(["new-job", "Add a notes API"], { root: dir });
  writeBrief(dir, "001-add-a-notes-api");
  run(["ready", "001-add-a-notes-api"], { root: dir });
}

test("set-status walks the pipeline and accept closes a ui-checked job", () => {
  const dir = makeWorkspace();
  briefJob(dir);

  const built = run(["set-status", "built", "001"], { root: dir });
  assert.match(built, /Job 001-add-a-notes-api status is built\./);
  assert.match(built, /next: tester/);
  assert.equal(readJobFile(dir, "001-add-a-notes-api").status, "built");

  assert.match(run(["set-status", "tested", "001-add-a-notes-api"], { root: dir }), /next: security/);
  assert.match(run(["set-status", "secured", "001-add-a-notes-api"], { root: dir }), /next: ui/);
  assert.match(run(["set-status", "ui-checked", "001-add-a-notes-api"], { root: dir }), /next: grokbot \(manager\)/);

  const accepted = run(["accept", "001-add-a-notes-api"], { root: dir });
  assert.match(accepted, /Job 001-add-a-notes-api is accepted\./);
  const status = run(["status"], { root: dir });
  assert.match(status, /\[accepted\]/);
  assert.match(status, /done/);
  assert.equal(readJobFile(dir, "001-add-a-notes-api").status, "accepted");
});

test("set-status sends failures and change requests back to the builder", () => {
  const dir = makeWorkspace();
  briefJob(dir);
  run(["set-status", "built", "001-add-a-notes-api"], { root: dir });

  assert.match(run(["set-status", "test-failed", "001-add-a-notes-api"], { root: dir }), /next: builder/);
  assert.match(run(["set-status", "built", "001-add-a-notes-api"], { root: dir }), /next: tester/);
  run(["set-status", "tested", "001-add-a-notes-api"], { root: dir });
  assert.match(run(["set-status", "security-failed", "001-add-a-notes-api"], { root: dir }), /next: builder/);
  run(["set-status", "built", "001-add-a-notes-api"], { root: dir });
  run(["set-status", "tested", "001-add-a-notes-api"], { root: dir });
  run(["set-status", "secured", "001-add-a-notes-api"], { root: dir });
  assert.match(run(["set-status", "ui-failed", "001-add-a-notes-api"], { root: dir }), /next: builder/);
  run(["set-status", "built", "001-add-a-notes-api"], { root: dir });
  run(["set-status", "tested", "001-add-a-notes-api"], { root: dir });
  run(["set-status", "secured", "001-add-a-notes-api"], { root: dir });
  run(["set-status", "ui-checked", "001-add-a-notes-api"], { root: dir });
  assert.match(run(["set-status", "changes-requested", "001-add-a-notes-api"], { root: dir }), /next: builder/);
  assert.throws(() => run(["accept", "001-add-a-notes-api"], { root: dir }), /Status must be ui-checked/);
});

test("set-status and accept reject missing jobs and illegal moves", () => {
  const dir = makeWorkspace();
  assert.throws(() => run(["set-status", "built"], { root: dir }), /No job found/);
  assert.throws(() => run(["accept"], { root: dir }), /No job found/);

  briefJob(dir);
  assert.throws(() => run(["set-status"], { root: dir }), /Unknown status ""/);
  assert.throws(
    () => run(["set-status", "shipped", "001-add-a-notes-api"], { root: dir }),
    /Unknown status "shipped"/,
  );
  assert.throws(
    () => run(["set-status", "accepted", "001-add-a-notes-api"], { root: dir }),
    /npm start -- accept/,
  );
  assert.throws(() => run(["set-status", "briefed", "001-add-a-notes-api"], { root: dir }), /npm start -- ready/);
  assert.throws(() => run(["set-status", "draft", "001-add-a-notes-api"], { root: dir }), /new-job/);
  assert.throws(
    () => run(["set-status", "secured", "001-add-a-notes-api"], { root: dir }),
    /Cannot set 001-add-a-notes-api to secured from briefed\. From briefed you can set: built, changes-requested\./,
  );
  assert.throws(() => run(["accept", "001-add-a-notes-api"], { root: dir }), /Status must be ui-checked/);
});

test("unknown command and missing job fail clearly", () => {
  assert.throws(() => run(["ship-it"], { root }), /Unknown command/);
  assert.throws(() => run(["prompt", "builder"], { root }), /No job found/);
});

test("slugify keeps job ids readable", () => {
  assert.equal(slugify("Add a notes API"), "add-a-notes-api");
  assert.equal(slugify("!!!"), "job");
});
