var mod_Mail = Mail;
import { Message as Message_Message } from "./Message";
import { HeadersWithRfc2047 as HeadersWithRfc2047_HeadersWithRfc2047 } from "./HeadersWithRfc2047";
import ext_util_util from "util";

function Mail(obj) {
    Message_Message.call(this, obj);
}

ext_util_util.inherits(Mail, Message_Message);

Mail.prototype.isMessyMail = true;

Mail.prototype.HeadersConstructor = HeadersWithRfc2047_HeadersWithRfc2047;

export { mod_Mail as Mail };
