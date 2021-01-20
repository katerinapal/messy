var mod_HeadersWithRfc2047 = HeadersWithRfc2047;
import { Headers as Headers_Headers } from "./Headers";
import ext_rfc2047_rfc2047 from "rfc2047";
import ext_util_util from "util";

function HeadersWithRfc2047(obj, doNotStringify) {
    Headers_Headers.call(this, obj, doNotStringify);
}

ext_util_util.inherits(HeadersWithRfc2047, Headers_Headers);

HeadersWithRfc2047.prototype.isMessyHeadersWithRfc2047 = true;

HeadersWithRfc2047.prototype.serializeHeaderValue = function (parsedHeaderValue) {
    return ext_rfc2047_rfc2047.encode(parsedHeaderValue);
};

HeadersWithRfc2047.prototype.parseHeaderValue = function (serializedHeaderValue) {
    return ext_rfc2047_rfc2047.decode(String(serializedHeaderValue));
};

export { mod_HeadersWithRfc2047 as HeadersWithRfc2047 };