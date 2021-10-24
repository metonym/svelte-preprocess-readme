# svelte-preprocess-readme

> Develop and demo Svelte components from your `README.md`

`svelte-preprocess-readme` is a Svelte preprocessor that turns your `README.md` file into live documentation.

## Installation

**Yarn**

```bash
yarn add -D svelte-preprocess-readme
```

**NPM**

```bash
npm i -D svelte-preprocess-readme
```

**pnpm**

```bash
pnpm i -D svelte-preprocess-readme
```

## Usage

This preprocessor is designed to be used with [Vite](https://vitejs.dev/).

**`package.json`**

```json
{
  "name": "svelte-focus-key",
  "svelte": "./src/index.js",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "devDependencies": {
    "@sveltejs/vite-plugin-svelte": "next",
    "svelte": "^3.44.0",
    "vite": "^2.6.10"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/metonym/svelte-focus-key"
  }
}
```

**vite.config.js**

```js
// vite.config.js
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { preprocessReadme } from "svelte-preprocess-readme";
import pkg from "./package.json";

export default {
  plugins: [
    svelte({
      extensions: [".svelte", ".md"],
      preprocess: [
        preprocessReadme({
          name: pkg.name,
          svelte: pkg.svelte,
          relativeUrlPrefix: pkg.repository.url,
        }),
      ],
    }),
  ],
};
```

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <script type="module">
      import App from "./README.md";

      new App({ target: document.body });
    </script>
  </body>
</html>
```

## License

[MIT](LICENSE)
