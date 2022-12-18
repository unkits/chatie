import { ChatGPTAPI, getOpenAIAuth } from 'chatgpt'
import { useBotConfig } from '@/store';

async function useChatGPT(prompt:string) {
  const [config]=useBotConfig()

  const openAIAuth = await getOpenAIAuth({
    email: config.openai.email,
    password: config.openai.password
  })

  const api = new ChatGPTAPI({ ...openAIAuth })
  await api.initSession()

  const res = await api.sendMessage(prompt)

  return res.response
}

useChatGPT('Write a python version of bubble sort. Do not include example usage.').catch((err) => {
  console.error(err)
  process.exit(1)
})
