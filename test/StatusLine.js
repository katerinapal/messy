"use strict";

var _unexpected = require("unexpected");

var _unexpected2 = _interopRequireDefault(_unexpected);

var _StatusLine = require("../lib/StatusLine");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('StatusLine', function () {
    describe('#toJSON', function () {
        it('should return non-computed properties', function () {
            (0, _unexpected2.default)(new _StatusLine.StatusLine('HTTP/1.1 200 OK').toJSON(), 'to equal', {
                statusCode: 200,
                statusMessage: 'OK',
                protocolName: 'HTTP',
                protocolVersion: '1.1'
            });
        });

        // Makes it possible to use statusLine.toJSON() as the RHS of a 'to satisfy' assertion in Unexpected
        // where undefined means that the property must not be present:
        it('should not include the keys that have undefined values', function () {
            (0, _unexpected2.default)(new _StatusLine.StatusLine('HTTP/1.1').toJSON(), 'not to have key', 'statusCode');
        });
    });
});