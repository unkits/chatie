import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";

const __filepath = fileURLToPath(import.meta.url);
const __dirname = dirname(__filepath);

export const useFilePath = (path: string): [string,boolean] => {
  const filePath = resolve(__dirname, path);
  const isExist = existsSync(filePath);
  return [filePath, isExist];
};

export const useYamlParser = (path: string) => {
  const file = readFileSync(path, "utf8");
  return YAML.parse(file);
};

export const useYamlWriter = (path: string, config: any) => {
  writeFileSync(path, YAML.stringify(config));
};
