"use strict";

var _unexpected = require("unexpected");

var _unexpected2 = _interopRequireDefault(_unexpected);

var _RequestLine = require("../lib/RequestLine");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('RequestLine', function () {
    it('should add a leading slash to the url if not specified', function () {
        (0, _unexpected2.default)(new _RequestLine.RequestLine('GET foo').url, 'to equal', '/foo');
    });

    describe('#toString', function () {
        it('should omit an undefined protocol', function () {
            (0, _unexpected2.default)(new _RequestLine.RequestLine('GET /').toString(), 'to equal', 'GET /');
        });
    });

    describe('#toJSON', function () {
        it('should return non-computed properties', function () {
            (0, _unexpected2.default)(new _RequestLine.RequestLine('GET / HTTP/1.1').toJSON(), 'to equal', {
                method: 'GET',
                url: '/',
                protocolName: 'HTTP',
                protocolVersion: '1.1'
            });
        });

        // Makes it possible to use statusLine.toJSON() as the RHS of a 'to satisfy' assertion in Unexpected
        // where undefined means that the property must not be present:
        it('should not include the keys that have undefined values', function () {
            (0, _unexpected2.default)(new _RequestLine.RequestLine('GET').toJSON(), 'not to have keys', ['path', 'protocolName', 'protocolVersion']);
        });
    });
});
