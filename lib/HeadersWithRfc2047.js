import { Headers as Headers_Headersjs } from "./Headers";
import rfc2047 from "rfc2047";
import util from "util";

function HeadersWithRfc2047(obj, doNotStringify) {
    Headers_Headersjs.call(this, obj, doNotStringify);
}

util.inherits(HeadersWithRfc2047, Headers_Headersjs);

HeadersWithRfc2047.prototype.isMessyHeadersWithRfc2047 = true;

HeadersWithRfc2047.prototype.serializeHeaderValue = function (parsedHeaderValue) {
    return rfc2047.encode(parsedHeaderValue);
};

HeadersWithRfc2047.prototype.parseHeaderValue = function (serializedHeaderValue) {
    return rfc2047.decode(String(serializedHeaderValue));
};

var exported_HeadersWithRfc2047 = HeadersWithRfc2047;
export { exported_HeadersWithRfc2047 as HeadersWithRfc2047 };