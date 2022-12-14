/*
 * @Description: The error event makes the bot to throw an error whenever an error is encounterd.
 */

import { log } from "wechaty";

export const useError = (error) => {
  log.error("Bot", error);
};
