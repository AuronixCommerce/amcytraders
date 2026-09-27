import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const executable = process.platform === "win32" ? "esbuild.cmd" : "esbuild";

execFileSync(join(root, "node_modules", ".bin", executable), [
  join(root, "desktop", "firebase-entry.js"),
  "--bundle",
  "--format=esm",
  "--platform=browser",
  "--target=chrome120",
  "--minify",
  `--outfile=${join(root, "public", "amcy", "firebase-bundle.js")}`,
], { stdio: "inherit" });
