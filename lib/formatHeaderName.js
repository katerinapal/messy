var formatHeaderName_formatHeaderName = formatHeaderName;
import {     headerNameSpecialCasesjs as headerNameSpecialCases_headerNameSpecialCasesjsjs, } from "./headerNameSpecialCases";
function formatHeaderName(headerName) {
    var lowerCasedHeaderName = headerName.toLowerCase();
    if (headerNameSpecialCases_headerNameSpecialCasesjsjs.hasOwnProperty(lowerCasedHeaderName)) {
        return headerNameSpecialCases_headerNameSpecialCasesjsjs[lowerCasedHeaderName];
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
export { formatHeaderName_formatHeaderName as formatHeaderName };
