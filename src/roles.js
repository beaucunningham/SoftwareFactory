const fs = require("node:fs");
const path = require("node:path");

function parseFrontmatter(text) {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, body: text.trim() };
  }

  const data = {};
  for (const line of match[1].split("\n")) {
    const index = line.indexOf(":");
    if (index === -1) {
      continue;
    }
    data[line.slice(0, index).trim()] = line.slice(index + 1).trim();
  }

  return { data, body: match[2].trim() };
}

function loadRoles(root, pipeline = []) {
  const agentsDir = path.join(root, ".cursor", "agents");
  if (!fs.existsSync(agentsDir)) {
    return [];
  }

  const roles = fs
    .readdirSync(agentsDir)
    .filter((name) => name.endsWith(".md"))
    .map((fileName) => {
      const source = fs.readFileSync(path.join(agentsDir, fileName), "utf8");
      const { data, body } = parseFrontmatter(source);
      const id = data.name || fileName.replace(/\.md$/, "");
      return {
        id,
        description: data.description || "",
        readonly: data.readonly === "true",
        prompt: body,
        file: path.join(".cursor", "agents", fileName),
      };
    });

  return roles.sort((a, b) => {
    const aIndex = pipeline.indexOf(a.id);
    const bIndex = pipeline.indexOf(b.id);
    return (aIndex === -1 ? 99 : aIndex) - (bIndex === -1 ? 99 : bIndex);
  });
}

module.exports = { loadRoles, parseFrontmatter };
