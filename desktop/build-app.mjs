import { cp, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const desktopDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.dirname(desktopDir);
const stage = await mkdtemp(path.join(tmpdir(), "amcy-desktop-"));
const electronBuilderEntry = fileURLToPath(import.meta.resolve("electron-builder"));
const electronBuilderCli = path.join(path.dirname(electronBuilderEntry), "cli", "cli.js");
const portableOnly = process.argv.includes("--portable-only");

try {
  const manifest = JSON.parse(await readFile(path.join(desktopDir, "package.json"), "utf8"));
  manifest.build.directories.output = path.join(projectRoot, "release");
  await writeFile(path.join(stage, "package.json"), `${JSON.stringify(manifest, null, 2)}\n`);
  await cp(path.join(desktopDir, "main.cjs"), path.join(stage, "main.cjs"));
  await cp(path.join(desktopDir, "preload.cjs"), path.join(stage, "preload.cjs"));
  await cp(path.join(projectRoot, "public", "amcy"), path.join(stage, "amcy"), { recursive: true });

  const args = [electronBuilderCli, "--projectDir", stage, "--win", "portable"];
  if (!portableOnly) args.push("nsis");
  args.push("--x64");
  const child = spawn(process.execPath, args, {
    cwd: projectRoot,
    stdio: "inherit",
    env: { ...process.env, CSC_IDENTITY_AUTO_DISCOVERY: "false" },
  });
  const exitCode = await new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("exit", code => resolve(code ?? 1));
  });
  if (exitCode !== 0) process.exitCode = exitCode;
} finally {
  await rm(stage, { recursive: true, force: true });
}
