"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Mail = undefined;

var _Message = require("./Message");

var _HeadersWithRfc = require("./HeadersWithRfc2047");

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Mail(obj) {
    _Message.Message.call(this, obj);
}

_util2.default.inherits(Mail, _Message.Message);

Mail.prototype.isMessyMail = true;

Mail.prototype.HeadersConstructor = _HeadersWithRfc.HeadersWithRfc2047;

var exported_Mail = Mail;
exports.Mail = exported_Mail;
