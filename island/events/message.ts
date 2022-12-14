/*
 * @Description: The message event notifies you when a new message arrives.
 */

import { Message, log, types as PuppetTypes } from "wechaty";
import { useOpenAiReply } from "@/plugin/open-ai";

export const useMessage = async (msg: Message) => {
  const room = msg.room();
  const topic = (await room?.topic()) || null;
  const contact = msg.talker();
  const content = msg.text().trim();
  const alias = (await contact.alias()) || (await contact.name());

  const isSelf = msg.self();
  const isText = msg.type() === PuppetTypes.Message.Text;
  const isMentioned = await msg.mentionSelf();

  if (isSelf) return;  /* Check if a message is sent by self */
  if (!isText) return;  /* Check if a message is in text type */

  if (room) {
    if (content.startsWith("/ai ")) {
      const request = content.replace("/ai ", "");
      room.say(await useOpenAiReply(request));
    }
    log.info(`Message: [${topic}<${alias}>] => ${content}`);
  }
  if (!room) {
    log.info(`Message: [Contact<${alias}>] => ${content}`);
    contact.say(await useOpenAiReply(content));
  }
};
