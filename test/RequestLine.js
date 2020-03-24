import expect from "unexpected";
import { RequestLine as libRequestLine_RequestLinejs } from "../lib/RequestLine";

describe('RequestLine', function () {
    it('should add a leading slash to the url if not specified', function () {
        expect(new libRequestLine_RequestLinejs('GET foo').url, 'to equal', '/foo');
    });

    describe('#toString', function () {
        it('should omit an undefined protocol', function () {
            expect(new libRequestLine_RequestLinejs('GET /').toString(), 'to equal', 'GET /');
        });
    });

    describe('#toJSON', function () {
        it('should return non-computed properties', function () {
            expect(new libRequestLine_RequestLinejs('GET / HTTP/1.1').toJSON(), 'to equal', {
                method: 'GET',
                url: '/',
                protocolName: 'HTTP',
                protocolVersion: '1.1'
            });
        });

        // Makes it possible to use statusLine.toJSON() as the RHS of a 'to satisfy' assertion in Unexpected
        // where undefined means that the property must not be present:
        it('should not include the keys that have undefined values', function () {
            expect(new libRequestLine_RequestLinejs('GET').toJSON(), 'not to have keys', ['path', 'protocolName', 'protocolVersion']);
        });
    });
});
