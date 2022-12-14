/*
 * @Description: Room Events.
 */

import { log } from "wechaty";

export const useRoomJoin = async (room, inviteeList, inviter) => {
  const topic = await room.topic();
  log.info(
    "Room: [%s] got new member <%s>, invited by <%s>",
    topic,
    inviteeList.map((i) => i.name()).join(","),
    inviter.name()
  );

  await room.say("\n绿色森林里有树也有花\n没有告密者也没有警察", inviteeList[0]);
};

export const useRoomLeave = async (room, leaverList) => {
  const topic = await room.topic();
  const name = leaverList[0] ? leaverList[0].name() : "no contact!";
  log.info("Room: [%s] lost member <%s>", topic, leaverList.map((i) => i.name()).join(","));

  await room.say(`<${name}> 被妖怪抓走啦!`);
};
