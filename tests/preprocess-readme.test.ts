import fs from "fs";
import { promisify } from "util";
import { join } from "path";
import { preprocess } from "svelte/compiler";
import { preprocessReadme } from "../src/preprocess-readme";

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const SNAPSHOTS = "./tests/snapshots";

(async () => {
  const inputs = (await readdir(SNAPSHOTS))
    .filter((file) => file.endsWith(".md"))
    .map(async (filename) => ({
      filename,
      source: await readFile(join(SNAPSHOTS, filename), "utf-8"),
    }));

  for await (const { filename, source } of inputs) {
    const { code } = await preprocess(
      source,
      [
        preprocessReadme({
          name: "svelte-component",
          svelte: "./src/index.js",
          relativeUrlPrefix:
            "https://github.com/metonym/svelte-preprocess-readme",
        }),
      ],
      { filename }
    );
    await writeFile(join(SNAPSHOTS, `${filename}.svelte`), code);
  }
})();
