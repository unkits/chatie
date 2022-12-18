import { Configuration, OpenAIApi } from "openai";
import { useBotConfig } from "@/store";

const [config] = useBotConfig();

const configuration = new Configuration({
  apiKey: config.openai.api_key,
});
const openai = new OpenAIApi(configuration);

export const useOpenAiReply = async (prompt: string) => {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.9,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0.0,
    presence_penalty: 0.6,
    stop: [" Human:", " AI:"],
  });
  const reply = response.data.choices[0].text.trim();
  return reply;
};
