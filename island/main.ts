import { WechatyBuilder, log } from "wechaty";

import { useLogin, useLogout, useScanner } from "@/events/user";
import { useMessage } from "@/events/message";
import { useFriendship } from "@/events/friendship";
import { useRoomJoin, useRoomLeave } from "@/events/room";
import { useError } from "@/events/error";

const bot = WechatyBuilder.build({
  name: "chatie",
  puppet: "wechaty-puppet-wechat",
  puppetOptions: {
    uos: true,
  },
});

bot
  .on("scan",          useScanner)
  .on("login",           useLogin)
  .on("logout",         useLogout)
  .on("message",       useMessage)
  .on("friendship", useFriendship)
  .on("room-join",    useRoomJoin)
  // .on("room-leave",  useRoomLeave)
  .on("error",           useError);

bot
  .start()
  .then(() => log.info("Bot", "Service Started."));
