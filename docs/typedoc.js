module.exports = {
  out: "../dist-docs/api",
  readme: "none",
  includes: "../src",
  exclude: [
    "**/transforms/**/*",
    "**/IterableCreatorIterable.ts",
    "**/ObjectIterable.ts",
  ],
  mode: "file",
  excludeExternals: true,
  excludeNotExported: true,
  excludePrivate: true,
  excludeProtected: true,
  theme: "./apidocs-template",
};
