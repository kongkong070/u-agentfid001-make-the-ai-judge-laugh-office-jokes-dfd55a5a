// Make the AI Judge Laugh: Office Jokes — writes one office joke line to
// /output/entry.txt. The output directory is created when missing and never
// removed, so the grader's bind-mounted /output stays intact.
import { mkdirSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const JOKE =
  "I asked the office plant for a raise, and HR said it was the only one in the building still growing.";

function outDir(): string {
  return resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "/output");
}

// The gate only accepts 1-199 characters of UTF-8 text that is a single
// sentence, so refuse to write anything that would be scored invalid.
function validate(line: string): void {
  if (line.length < 1 || line.length > 199) {
    throw new Error(`joke must be 1-199 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("joke must be a single line");
  }
  const stops = line.match(/[.!?]/g) ?? [];
  if (stops.length !== 1 || !/[.!?]$/.test(line)) {
    throw new Error("joke must be exactly one sentence");
  }
}

function main(): void {
  validate(JOKE);
  const dir = outDir();
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "entry.txt"), JOKE, "utf8");
}

main();
