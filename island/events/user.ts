/*
 * @Description: User Events.
 */

import { Contact, ScanStatus, log } from "wechaty";
import QrcodeTerminal from "qrcode-terminal";

export const useScanner = (qrcode: string, status: ScanStatus) => {
  if (status === ScanStatus.Waiting || status === ScanStatus.Timeout) {
    let info =
      status === ScanStatus.Waiting
        ? ScanStatus[status] + "..."
        : ScanStatus[status] + " - Try Again";
    log.info("Bot", "onScan: %s", info);

    QrcodeTerminal.generate(qrcode, { small: true }); // show qrcode on console
  } else {
    log.info("Bot", "onScan: %s", ScanStatus[status]);
  }
};

export const useLogin = (user: Contact) => {
  log.info("God", "%s login.", user);
};

export const useLogout = (user: Contact) => {
  log.info("God", "%s logout.", user);
};
