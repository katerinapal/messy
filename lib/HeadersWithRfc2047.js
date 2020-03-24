"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HeadersWithRfc2047 = undefined;

var _Headers = require("./Headers");

var _rfc = require("rfc2047");

var _rfc2 = _interopRequireDefault(_rfc);

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function HeadersWithRfc2047(obj, doNotStringify) {
    _Headers.Headers.call(this, obj, doNotStringify);
}

_util2.default.inherits(HeadersWithRfc2047, _Headers.Headers);

HeadersWithRfc2047.prototype.isMessyHeadersWithRfc2047 = true;

HeadersWithRfc2047.prototype.serializeHeaderValue = function (parsedHeaderValue) {
    return _rfc2.default.encode(parsedHeaderValue);
};

HeadersWithRfc2047.prototype.parseHeaderValue = function (serializedHeaderValue) {
    return _rfc2.default.decode(String(serializedHeaderValue));
};

var exported_HeadersWithRfc2047 = HeadersWithRfc2047;
exports.HeadersWithRfc2047 = exported_HeadersWithRfc2047;
