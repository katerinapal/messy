var Mail_Mail = Mail;
import { Message as Message_Messagejs } from "./Message";
import { HeadersWithRfc2047 as HeadersWithRfc2047_HeadersWithRfc2047js } from "./HeadersWithRfc2047";
import ext_util_util from "util";

function Mail(obj) {
    Message_Messagejs.call(this, obj);
}

ext_util_util.inherits(Mail, Message_Messagejs);

Mail.prototype.isMessyMail = true;

Mail.prototype.HeadersConstructor = HeadersWithRfc2047_HeadersWithRfc2047js;

export { Mail_Mail as Mail };
