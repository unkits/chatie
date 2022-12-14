import { useFilePath, useYamlParser, useYamlWriter } from "@/utils";

export const useBotConfig = () => {
  const [configPath] = useFilePath("../botconfig.yaml");
  const config = useYamlParser(configPath);
  const setConfig = (state: any) => useYamlWriter(configPath, state);
  return [config, setConfig];
};
