"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.formatHeaderName = undefined;

var _headerNameSpecialCases = require("./headerNameSpecialCases");

var mod_formatHeaderName = formatHeaderName;

function formatHeaderName(headerName) {
    var lowerCasedHeaderName = headerName.toLowerCase();
    if (_headerNameSpecialCases.headerNameSpecialCasesjs.hasOwnProperty(lowerCasedHeaderName)) {
        return _headerNameSpecialCases.headerNameSpecialCasesjs[lowerCasedHeaderName];
    } else {
        // Make sure that the first char and all chars following a dash are upper-case:
        return lowerCasedHeaderName.replace(/(^|-)([a-z])/g, function ($0, optionalLeadingDash, ch) {
            return optionalLeadingDash + ch.toUpperCase();
        });
    }
}

/**
 * Convert a header name to its canonical form,
 * e.g. "content-length" => "Content-Length".
 * @param headerName the header name (case insensitive)
 * @return {String} the formatted header name
 */
exports.formatHeaderName = mod_formatHeaderName;