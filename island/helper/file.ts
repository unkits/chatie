import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, join } from "path";
import YAML from "yaml";

export const usePathParser =
  (path: string, baseUrl: string = ""): [string, boolean] => {
    const rootPath = resolve(".") + "/" + baseUrl;
    const filePath = join(rootPath, path);
    const isExist = existsSync(filePath);

    return [filePath, isExist];
  };

export const useYamlMemo =
  (source: string, init: any = null) => {
    const [path, isExist] = usePathParser(source);

    const state = () => {
      const file = readFileSync(path, "utf8");
      return YAML.parse(file);
    };
    const setState = (config: any) => {
      writeFileSync(path, YAML.stringify(config));
    };

    const initState = () => {
      if (isExist) return state();
      setState(init);
      return init;
    };

    return [initState(), setState];
  };
