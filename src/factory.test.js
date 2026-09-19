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

test("help lists the factory pipeline", () => {
  const output = run(["help"], { root });
  assert.match(output, /planner → builder → tester → reviewer/);
});

test("roles lists the specialist agents", () => {
  const output = run(["roles"], { root });
  for (const role of ["planner", "builder", "tester", "reviewer"]) {
    assert.match(output, new RegExp(`- ${role}:`));
  }
});

test("new-job creates a ticket and status shows the next role", () => {
  const dir = makeWorkspace();
  const created = run(["new-job", "Add a notes API"], { root: dir });
  assert.match(created, /001-add-a-notes-api/);
  assert.equal(
    fs.existsSync(path.join(dir, "factory", "jobs", "001-add-a-notes-api", "request.md")),
    true,
  );

  const status = run(["status"], { root: dir });
  assert.match(status, /001-add-a-notes-api/);
  assert.match(status, /\[requested\]/);
  assert.match(status, /next: planner/);
});

test("prompt builds a launch brief for a role and job", () => {
  const dir = makeWorkspace();
  run(["new-job", "Add a notes API"], { root: dir });
  const prompt = run(["prompt", "planner", "001-add-a-notes-api"], { root: dir });
  assert.match(prompt, /You are the SoftwareFactory planner/);
  assert.match(prompt, /factory\/jobs\/001-add-a-notes-api\//);
  assert.match(prompt, /Do not implement product code/);
});

test("unknown command and missing job fail clearly", () => {
  assert.throws(() => run(["ship-it"], { root }), /Unknown command/);
  assert.throws(() => run(["prompt", "planner"], { root }), /No job found/);
});

test("slugify keeps job ids readable", () => {
  assert.equal(slugify("Add a notes API"), "add-a-notes-api");
  assert.equal(slugify("!!!"), "job");
});
