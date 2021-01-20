import ext_expect from "unexpected";
import { RequestLine as RequestLine_RequestLine } from "../lib/RequestLine";

describe('RequestLine', function () {
    it('should add a leading slash to the url if not specified', function () {
        ext_expect(new RequestLine_RequestLine('GET foo').url, 'to equal', '/foo');
    });

    describe('#toString', function () {
        it('should omit an undefined protocol', function () {
            ext_expect(new RequestLine_RequestLine('GET /').toString(), 'to equal', 'GET /');
        });
    });

    describe('#toJSON', function () {
        it('should return non-computed properties', function () {
            ext_expect(new RequestLine_RequestLine('GET / HTTP/1.1').toJSON(), 'to equal', {
                method: 'GET',
                url: '/',
                protocolName: 'HTTP',
                protocolVersion: '1.1'
            });
        });

        // Makes it possible to use statusLine.toJSON() as the RHS of a 'to satisfy' assertion in Unexpected
        // where undefined means that the property must not be present:
        it('should not include the keys that have undefined values', function () {
            ext_expect(new RequestLine_RequestLine('GET').toJSON(), 'not to have keys', ['path', 'protocolName', 'protocolVersion']);
        });
    });
});
