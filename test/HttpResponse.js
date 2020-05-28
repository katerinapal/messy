"use strict";

var _unexpected = require("unexpected");

var _unexpected2 = _interopRequireDefault(_unexpected);

var _HttpResponse = require("../lib/HttpResponse");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('HttpResponse', function () {
    it('should parse a standalone status line', function () {
        var httpResponse = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK');
        (0, _unexpected2.default)(httpResponse.protocol, 'to equal', 'HTTP/1.1');
        (0, _unexpected2.default)(httpResponse.statusCode, 'to equal', 200);
        (0, _unexpected2.default)(httpResponse.statusMessage, 'to equal', 'OK');
        (0, _unexpected2.default)(httpResponse.toString(), 'to equal', 'HTTP/1.1 200 OK\r\n');
    });

    it('should parse a status line with more than one word in the status message', function () {
        var httpResponse = new _HttpResponse.HttpResponse('HTTP/1.1 412 Precondition Failed');
        (0, _unexpected2.default)(httpResponse.protocol, 'to equal', 'HTTP/1.1');
        (0, _unexpected2.default)(httpResponse.statusCode, 'to equal', 412);
        (0, _unexpected2.default)(httpResponse.statusMessage, 'to equal', 'Precondition Failed');
        (0, _unexpected2.default)(httpResponse.toString(), 'to equal', 'HTTP/1.1 412 Precondition Failed\r\n');
    });

    it('should parse a status line followed by headers', function () {
        var httpResponse = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n');
        (0, _unexpected2.default)(httpResponse.statusCode, 'to equal', 200);
        (0, _unexpected2.default)(httpResponse.toString(), 'to equal', 'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n');
    });

    it('should parse a status line followed by headers and a body', function () {
        var httpResponse = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah');
        (0, _unexpected2.default)(httpResponse.statusCode, 'to equal', 200);
        (0, _unexpected2.default)(httpResponse.body, 'to equal', 'blah');
        (0, _unexpected2.default)(httpResponse.toString(), 'to equal', 'HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah');
    });

    it('should accept the status line as an option to the constructor', function () {
        (0, _unexpected2.default)(new _HttpResponse.HttpResponse({ statusLine: 'HTTP/1.1 200 OK' }), 'to have properties', {
            protocol: 'HTTP/1.1',
            statusCode: 200,
            statusMessage: 'OK'
        });
    });

    it('should accept a number and interpret it as the status code', function () {
        (0, _unexpected2.default)(new _HttpResponse.HttpResponse(404), 'to have properties', {
            statusCode: 404
        });
    });

    it('should parse a partial status line', function () {
        (0, _unexpected2.default)(new _HttpResponse.HttpResponse('HTTP/1.1 200'), 'to have properties', {
            protocol: 'HTTP/1.1',
            statusCode: 200
        });
    });

    it('should only include CRLFCRLF when there are no headers', function () {
        (0, _unexpected2.default)(new _HttpResponse.HttpResponse({
            statusLine: 'HTTP/1.1 200 OK',
            body: 'foo'
        }).toString(), 'to equal', 'HTTP/1.1 200 OK\r\n\r\nfoo');
    });

    it('should expose the StatusLine instance', function () {
        (0, _unexpected2.default)(new _HttpResponse.HttpResponse({
            protocol: 'HTTP/1.1',
            statusCode: 200,
            statusMessage: 'OK'
        }).statusLine.toString(), 'to equal', 'HTTP/1.1 200 OK');
    });

    it('should allow updating the status line', function () {
        var httpResponse = new _HttpResponse.HttpResponse({
            protocol: 'HTTP/1.1',
            statusCode: 200,
            statusMessage: 'OK'
        });
        httpResponse.statusLine.populateFromString('HTTP/1.0 400 Bad Request');
        (0, _unexpected2.default)(httpResponse, 'to have properties', {
            protocol: 'HTTP/1.0',
            statusCode: 400,
            statusMessage: 'Bad Request'
        });
    });

    it('should make the protocol version available as a getter', function () {
        (0, _unexpected2.default)(new _HttpResponse.HttpResponse('HTTP/1.1 200 OK').protocolVersion, 'to equal', '1.1');
    });

    it('should make the protocol name available as a getter', function () {
        (0, _unexpected2.default)(new _HttpResponse.HttpResponse('HTTP/1.0 200 OK').protocolName, 'to equal', 'HTTP');
    });

    it('should accept the individual status line properties as options to the constructor', function () {
        (0, _unexpected2.default)(new _HttpResponse.HttpResponse({
            protocol: 'HTTP/1.1',
            statusCode: 200,
            statusMessage: 'OK'
        }), 'to have properties', {
            protocol: 'HTTP/1.1',
            statusCode: 200,
            statusMessage: 'OK'
        });
    });

    it('should consider an identical instance equal', function () {
        var httpResponse1 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah'),
            httpResponse2 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah');
        (0, _unexpected2.default)(httpResponse1.equals(httpResponse2), 'to be true');
    });

    it('should consider two instances unequal if they differ by protocol', function () {
        var httpResponse1 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah'),
            httpResponse2 = new _HttpResponse.HttpResponse('HTTP/1.0 200 OK\r\nContent-Type: text/html\r\n\r\nblah');
        (0, _unexpected2.default)(httpResponse1.equals(httpResponse2), 'to be false');
    });

    it('should consider two instances unequal if they differ by status code', function () {
        var httpResponse1 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah'),
            httpResponse2 = new _HttpResponse.HttpResponse('HTTP/1.1 400 OK\r\nContent-Type: text/html\r\n\r\nblah');
        (0, _unexpected2.default)(httpResponse1.equals(httpResponse2), 'to be false');
    });

    it('should consider two instances unequal if they differ by status message', function () {
        var httpResponse1 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah'),
            httpResponse2 = new _HttpResponse.HttpResponse('HTTP/1.1 200 KO\r\nContent-Type: text/html\r\n\r\nblah');
        (0, _unexpected2.default)(httpResponse1.equals(httpResponse2), 'to be false');
    });

    it('should consider two instances unequal if they differ by status message', function () {
        var httpResponse1 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah'),
            httpResponse2 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nblah');
        (0, _unexpected2.default)(httpResponse1.equals(httpResponse2), 'to be false');
    });

    it('should consider two instances unequal if they differ by status message', function () {
        var httpResponse1 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\nblah'),
            httpResponse2 = new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nquux');
        (0, _unexpected2.default)(httpResponse1.equals(httpResponse2), 'to be false');
    });

    it('should parse a buffer', function () {
        var rawSrc = 'HTTP/1.1 200 OK\r\n' + 'X-Powered-By: Express\r\n' + 'Content-Type: text/plain\r\n' + 'Content-Length: 4\r\n' + 'ETag: "-836148900"\r\n' + 'Date: Sat, 21 Mar 2015 00:25:45 GMT\r\n' + 'Connection: keep-alive\r\n' + '\r\n' + 'blah';

        var httpResponse = new _HttpResponse.HttpResponse(new Buffer(rawSrc, 'ascii'));

        (0, _unexpected2.default)(httpResponse.toString(), 'to equal', rawSrc);
    });

    describe('#toJSON', function () {
        it('should include the messy.Message properties and put the statusLine properties at the top level', function () {
            (0, _unexpected2.default)(new _HttpResponse.HttpResponse('HTTP/1.1 200 OK\r\nFoo: bar\r\n\r\nblabla').toJSON(), 'to equal', {
                protocolName: 'HTTP',
                protocolVersion: '1.1',
                statusCode: 200,
                statusMessage: 'OK',
                headers: {
                    Foo: 'bar'
                },
                rawBody: 'blabla'
            });
        });
    });
});