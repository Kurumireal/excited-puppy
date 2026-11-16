// ai-excited-01 entry: "The Burst" — a golden retriever puppy leaping
// through a giant soap bubble straight at the viewer.
//
// The program's whole job is to deliver the image that sits beside it
// (entry.png) into the output directory as /output/entry.png, where the
// competition's gate and judge read it. Node 22, standard library only.

import { copyFileSync, mkdirSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// Directory this program lives in, so entry.png is found next to it no
// matter where the program is invoked from.
const here = dirname(fileURLToPath(import.meta.url));
const source = join(here, "entry.png");

// The harness sets MAKEFUN_OUTPUT_DIR; /output is the documented default.
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const destination = join(outputDir, "entry.png");

// Sanity check before copying: the gate only accepts an image of at most
// 1 MiB, so fail loudly here rather than deliver a file that scores 0.
const MAX_BYTES = 1_048_576;
const { size } = statSync(source);
if (size > MAX_BYTES) {
  throw new Error(
    `entry.png is ${size} bytes, over the ${MAX_BYTES}-byte gate limit`,
  );
}

// Create the output directory if it does not exist yet, then copy the
// image across byte for byte. Copying (rather than re-encoding) keeps the
// output identical on every run.
mkdirSync(outputDir, { recursive: true });
copyFileSync(source, destination);

console.log(`entry.png written to ${destination}`);
