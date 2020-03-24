import { Message as Message_Messagejs } from "./Message";
import { HeadersWithRfc2047 as HeadersWithRfc2047_HeadersWithRfc2047js } from "./HeadersWithRfc2047";
import util from "util";

function Mail(obj) {
    Message_Messagejs.call(this, obj);
}

util.inherits(Mail, Message_Messagejs);

Mail.prototype.isMessyMail = true;

Mail.prototype.HeadersConstructor = HeadersWithRfc2047_HeadersWithRfc2047js;

var exported_Mail = Mail;
export { exported_Mail as Mail };
