import { parse } from "svelte/compiler";
import { PreprocessorGroup } from "svelte/types/compiler/preprocess";
import Markdown from "markdown-it";
import isAbsoluteUrl from "is-absolute-url";
import { highlight, languages } from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-yaml";
import "prism-svelte";

const aliases: Record<string, string> = {
  sh: "bash",
  js: "javascript",
  ts: "typescript",
  tsx: "typescript",
  yml: "yaml",
};

export interface PreprocessReadmeOptions {
  name: string;
  svelte: string;
  relativeUrlPrefix: string;
}

export function preprocessReadme(
  opts: Partial<PreprocessReadmeOptions> = {}
): Pick<PreprocessorGroup, "markup"> {
  const name = opts?.name ?? "";
  const svelte = opts?.svelte ?? "";
  const relativeUrlPrefix = opts?.relativeUrlPrefix ?? "";

  return {
    markup({ content, filename }) {
      if (!/node_modules/.test(filename) && !filename.endsWith(".md")) {
        return { code: content, map: "" };
      }

      let scriptContent: string[] = [];
      let styleContent: string[] = [];
      let markdown = new Markdown({
        highlight(source, lang) {
          let sourceMarkup = "";

          if (lang === "svelte") {
            const { html, css, instance } = parse(source);

            sourceMarkup = `<div class="svelte">${source.slice(
              html.start,
              html.end
            )}</div>`;
            scriptContent = [
              ...scriptContent,
              ...source
                .slice(instance.start, instance.end)
                .split("\n")
                .slice(1, -1)
                .map((line) => line.trim().replace(name, svelte)),
            ];
            if (css) {
              styleContent = [
                ...styleContent,
                source.slice(
                  css?.start + "<style>".length,
                  css?.end - "</style>".length
                ),
              ];
            }
          }

          let code = source;
          let language = aliases[lang] || lang;

          try {
            code = highlight(code, languages[language], language);
          } catch (error) {
            console.error(`Could not highlight "${language}"`);
          }

          return `<pre class="language-${language}"><code>{@html \`${code}\`}</code></pre>${sourceMarkup}`;
        },
      });

      markdown.use((instance) => {
        instance.core.ruler.after("inline", "replace-link", ({ tokens }) => {
          tokens.forEach((token) => {
            if (token.type === "inline") {
              token.children?.forEach(({ type, attrs }) => {
                if (type === "link_open") {
                  attrs?.forEach((attr) => {
                    if (attr[0] === "href" && !isAbsoluteUrl(attr[1])) {
                      attr[1] = new URL(
                        attr[1].replace(/^(.\/|\/)/, ""),
                        /\/$/.test(relativeUrlPrefix)
                          ? relativeUrlPrefix
                          : relativeUrlPrefix + "/"
                      ).href;
                    }
                  });
                }
              });
            }
          });
        });
      });

      return {
        code: [
          markdown.render(content),
          `<script>${[...new Set(scriptContent)].join("")}</script>`,
          `<style>${[...new Set(styleContent)].join("")}</style>`,
        ].join("\n"),
        map: "",
      };
    },
  };
}
