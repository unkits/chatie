import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["island/main.ts"],
  format: ["esm"],
  outDir: "build",
  clean: true,
  minify: false,
  treeshake: true,
  splitting: false,
  sourcemap: false,
  // outExtension({ format }) {
  //   return {
  //     js: `.${format}.js`,
  //   };
  // },
});
