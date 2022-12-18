import { useYamlMemo } from "@/helper/file";

export const useBotConfig = () => {
  const initState = {
    wechaty: {
      access_keys: process.env.WECHATY_ACCESS_KEYS || ["Hello"],
      greeting_text: process.env.WECHATY_GREETING_TEXT || "Nice to meet you",
    },
    openai: {
      api_key: process.env.OPENAI_API_KEY,
      email: process.env.OPENAI_EMAIL,
      password: process.env.OPENAI_PASSWORD
    },
  };

  return useYamlMemo("/botconfig.yaml", initState);
};
