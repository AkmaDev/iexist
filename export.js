import fs from "fs";
import path from "path";
import { createCanvas } from "canvas";

const outputTxt = "project-structure.txt";
const outputPng = "project-structure.png";
const ignoreFolders = [
  "node_modules",
  ".git",
  ".next",
  "dist",
  "build",
  "out",
  ".turbo",
];

// Fonction pour générer arborescence ASCII
function generateTree(dir, indent = "", isLast = true) {
  const files = fs.readdirSync(dir).filter((f) => !ignoreFolders.includes(f));
  let result = "";

  files.forEach((file, index) => {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    const last = index === files.length - 1;
    const prefix = indent + (isLast ? "    " : "│   ");
    const line =
      indent +
      (last ? "└── " : "├── ") +
      (stat.isDirectory() ? "📂 " : "📄 ") +
      file;

    result += line + "\n";

    if (stat.isDirectory()) {
      result += generateTree(filepath, prefix, last);
    }
  });
  return result;
}

// Fonction pour ajouter le contenu des fichiers
function addFilesContent(dir) {
  let content = "";
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filepath = path.join(dir, file);
    if (ignoreFolders.some((folder) => filepath.includes(folder))) continue;

    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      content += addFilesContent(filepath);
    } else {
      content += `\n\n********** ${filepath} **********\n`;
      try {
        content += fs.readFileSync(filepath, "utf8");
      } catch {
        content += "[Contenu binaire non affiché]";
      }
    }
  }
  return content;
}

// 1️⃣ Générer ASCII
const asciiTree = generateTree(".");
fs.writeFileSync(outputTxt, "=== Architecture du projet ===\n\n" + asciiTree);

// 2️⃣ Ajouter contenu fichiers
fs.appendFileSync(
  outputTxt,
  "\n\n=== Contenu des fichiers ===\n" + addFilesContent(".")
);

// 3️⃣ Générer image PNG depuis ASCII (arborescence seule)
const lines = asciiTree.split("\n");
const canvas = createCanvas(1200, lines.length * 20);
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#fff";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "#000";
ctx.font = "14px monospace";

lines.forEach((line, i) => {
  ctx.fillText(line, 10, 20 + i * 20);
});

fs.writeFileSync(outputPng, canvas.toBuffer());
console.log(`✅ Image arborescence exportée dans ${outputPng}`);

// 4️⃣ Générer images paginées du contenu complet (arborescence + contenu fichiers)
const fullText = fs.readFileSync(outputTxt, "utf8");
const linesFull = fullText.split("\n");

const linesPerPage = 1000; // Modifiable selon ta mémoire/dispo
const canvasWidth = 1200;
const lineHeight = 20;

for (let page = 0; page * linesPerPage < linesFull.length; page++) {
  const start = page * linesPerPage;
  const end = Math.min(start + linesPerPage, linesFull.length);
  const pageLines = linesFull.slice(start, end);

  const canvasHeight = pageLines.length * lineHeight + 20;
  const canvasPage = createCanvas(canvasWidth, canvasHeight);
  const ctxPage = canvasPage.getContext("2d");

  ctxPage.fillStyle = "#fff";
  ctxPage.fillRect(0, 0, canvasWidth, canvasHeight);
  ctxPage.fillStyle = "#000";
  ctxPage.font = "14px monospace";

  pageLines.forEach((line, i) => {
    ctxPage.fillText(line, 10, 20 + i * lineHeight);
  });

  const outputPage = `project-structure-full-page-${page + 1}.png`;
  fs.writeFileSync(outputPage, canvasPage.toBuffer());
  console.log(`✅ Image page ${page + 1} exportée dans ${outputPage}`);
}
