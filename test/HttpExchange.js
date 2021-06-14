import ext_expect from "unexpected";
import { HttpExchange as HttpExchange_HttpExchange } from "../lib/HttpExchange";
import { HttpRequest as HttpRequest_HttpRequest } from "../lib/HttpRequest";
import { HttpResponse as HttpResponse_HttpResponse } from "../lib/HttpResponse";

describe('HttpExchange', function () {
    it('should accept an object containing an HttpRequest and an HttpResponse instance', function () {
        var httpExchange = new HttpExchange_HttpExchange({
            request: new HttpRequest_HttpRequest('GET / HTTP/1.1\nFoo: Bar\n\nblah'),
            response: new HttpResponse_HttpResponse('HTTP/1.1 200 OK\nQuux: Baz\n\nblaf')
        });

        ext_expect(httpExchange, 'to have properties', ['request', 'response']);
        ext_expect(httpExchange.request, 'to be an', HttpRequest_HttpRequest);
        ext_expect(httpExchange.response, 'to be an', HttpResponse_HttpResponse);
        ext_expect(
            httpExchange.toString(),
            'to equal',
            'GET / HTTP/1.1\r\nFoo: Bar\r\n\r\nblah\r\n\r\nHTTP/1.1 200 OK\r\nQuux: Baz\r\n\r\nblaf'
        );
    });

    it('should accept an object containing request and response as strings', function () {
        var httpExchange = new HttpExchange_HttpExchange({
            request: 'GET / HTTP/1.1\nFoo: Bar\n\nblah',
            response: 'HTTP/1.1 200 OK\nQuux: Baz\n\nblaf'
        });
        ext_expect(httpExchange, 'to have properties', ['request', 'response']);
        ext_expect(httpExchange.request, 'to be an', HttpRequest_HttpRequest);
        ext_expect(httpExchange.response, 'to be an', HttpResponse_HttpResponse);
        ext_expect(
            httpExchange.toString(),
            'to equal',
            'GET / HTTP/1.1\r\nFoo: Bar\r\n\r\nblah\r\n\r\nHTTP/1.1 200 OK\r\nQuux: Baz\r\n\r\nblaf'
        );
    });

    it('should accept an object containing HttpRequest and HttpResponse options objects', function () {
        var httpExchange = new HttpExchange_HttpExchange({
            request: {
                requestLine: {
                    method: 'GET',
                    protocol: 'HTTP/1.1',
                    path: '/'
                },
                headers: {
                    'Content-Type': 'text/html'
                },
                body: 'The Body'
            },
            response: {
                statusLine: 'HTTP/1.1 404 Not Found',
                headers: 'Content-Type: application/json',
                body: {foo: 123}
            }
        });
        ext_expect(httpExchange, 'to have properties', ['request', 'response']);
        ext_expect(httpExchange.request, 'to be an', HttpRequest_HttpRequest);
        ext_expect(httpExchange.response, 'to be an', HttpResponse_HttpResponse);
        ext_expect(
            httpExchange.toString(),
            'to equal',
            'GET / HTTP/1.1\r\nContent-Type: text/html\r\n\r\nThe Body\r\n\r\nHTTP/1.1 404 Not Found\r\nContent-Type: application/json\r\n\r\n{"foo":123}'
        );
    });

    it('should consider identical instances equal', function () {
        var httpExchange1 = new HttpExchange_HttpExchange({
                request: 'GET /foo HTTP/1.1\r\nHost: foo.com\r\n\r\nblah',
                response: {
                    statusLine: {
                        statusCode: 200,
                        protocol: 'HTTP/1.1',
                        statusMessage: 'OK'
                    },
                    body: 'blaf'
                }
            }),
            httpExchange2 = new HttpExchange_HttpExchange({
                request: {
                    method: 'GET',
                    url: '/foo',
                    protocol: 'HTTP/1.1',
                    headers: {
                        host: 'foo.com'
                    },
                    body: 'blah'
                },
                response: 'HTTP/1.1 200 OK\r\n\r\nblaf'
            });
        ext_expect(httpExchange1.equals(httpExchange2), 'to be true');
        ext_expect(httpExchange1.toString(), 'to equal', httpExchange2.toString());
    });

    it('should consider different instances unequal', function () {
        var httpExchange1 = new HttpExchange_HttpExchange({
                request: 'GET /foo HTTP/1.0\r\nHost: foo.com\r\n\r\nblah',
                response: {
                    statusLine: {
                        statusCode: 200,
                        protocol: 'HTTP/1.1',
                        statusMessage: 'OK'
                    },
                    body: 'blaf'
                }
            }),
            httpExchange2 = new HttpExchange_HttpExchange({
                request: {
                    method: 'GET',
                    url: '/foo',
                    protocol: 'HTTP/1.1'
                },
                response: 'HTTP/1.1 200 OK\r\n\r\nblaf'
            });
        ext_expect(httpExchange1.equals(httpExchange2), 'to be false');
        ext_expect(httpExchange1.toString(), 'not to equal', httpExchange2.toString());
    });

    describe('#toJSON', function () {
        it('should return an object with the request and response JSONified', function () {
            ext_expect(new HttpExchange_HttpExchange({
                request: new HttpRequest_HttpRequest('GET / HTTP/1.1\nFoo: Bar\n\nblah'),
                response: new HttpResponse_HttpResponse('HTTP/1.1 200 OK\nQuux: Baz\n\nblaf')
            }).toJSON(), 'to equal', {
                request: {
                    method: 'GET',
                    url: '/',
                    protocolName: 'HTTP',
                    protocolVersion: '1.1',
                    headers: {
                        Foo: 'Bar'
                    },
                    rawBody: 'blah'
                },
                response: {
                    statusCode: 200,
                    statusMessage: 'OK',
                    protocolName: 'HTTP',
                    protocolVersion: '1.1',
                    headers: {
                        Quux: 'Baz'
                    },
                    rawBody: 'blaf'
                }
            });
        });

        // Makes it possible to use statusLine.toJSON() as the RHS of a 'to satisfy' assertion in Unexpected
        // where undefined means that the property must not be present:
        it('should not include the keys that have undefined values', function () {
            var httpExchange = new HttpExchange_HttpExchange({
                request: new HttpRequest_HttpRequest('GET / HTTP/1.1\nFoo: Bar\n\nblah'),
                response: undefined
            });

            httpExchange.request = undefined;

            ext_expect(httpExchange.toJSON(), 'not to have keys', ['request', 'response']);
        });
    });
});
