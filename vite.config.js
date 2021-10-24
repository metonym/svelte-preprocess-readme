import pkg from "./package.json";

export default {
  build: {
    lib: {
      entry: "src",
      name: pkg.name,
    },
    rollupOptions: {
      external: Object.keys(pkg.dependencies),
      output: {
        globals: {
          "markdown-it": "Markdown",
          prismjs: "Prism",
          "is-absolute-url": "isAbsoluteUrl",
        },
      },
    },
  },
};
