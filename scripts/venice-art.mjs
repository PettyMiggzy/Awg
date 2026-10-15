// Generates site art through Venice. Usage: node scripts/venice-art.mjs <name> <model> <w> <h> "<prompt>"
import { readFileSync, writeFileSync } from "node:fs";
const env = Object.fromEntries(
  readFileSync(new URL("../.env", import.meta.url), "utf8")
    .split("\n").filter((l) => l.includes("=")).map((l) => l.split(/=(.*)/s).slice(0, 2)),
);
const [name, model, w, h, prompt] = process.argv.slice(2);
const res = await fetch(`${env.VENICE_BASE_URL}/image/generate`, {
  method: "POST",
  headers: { Authorization: `Bearer ${env.VENICE_API_KEY}`, "Content-Type": "application/json" },
  body: JSON.stringify({ model, prompt, width: +w, height: +h, format: "webp", safe_mode: false, hide_watermark: true }),
});
const json = await res.json();
if (!res.ok || !json.images?.[0]) { console.error(res.status, JSON.stringify(json).slice(0, 400)); process.exit(1); }
writeFileSync(new URL(`../public/images/venice/${name}.webp`, import.meta.url), Buffer.from(json.images[0], "base64"));
console.log("wrote", name);
