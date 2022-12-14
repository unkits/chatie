import { ChatGPTAPI } from 'chatgpt'
import { useBotConfig } from '@/store';

async function main() {
  const [config]=useBotConfig()

  const authInfo ={
    sessionToken: config.openai.sessionToken,
    clearanceToken: config.openai.clearanceToken,
    userAgent: config.openai.userAgent
  }

  const api = new ChatGPTAPI({ ...authInfo })
  await api.ensureAuth()

  const prompt =
    'Write a python version of bubble sort. Do not include example usage.'

  const response = await api.sendMessage(prompt)

  return response
}

main()
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
