import ext_expect from "unexpected";
import { StatusLine as StatusLine_StatusLine } from "../lib/StatusLine";

describe('StatusLine', function () {
    describe('#toJSON', function () {
        it('should return non-computed properties', function () {
            ext_expect(new StatusLine_StatusLine('HTTP/1.1 200 OK').toJSON(), 'to equal', {
                statusCode: 200,
                statusMessage: 'OK',
                protocolName: 'HTTP',
                protocolVersion: '1.1'
            });
        });

        // Makes it possible to use statusLine.toJSON() as the RHS of a 'to satisfy' assertion in Unexpected
        // where undefined means that the property must not be present:
        it('should not include the keys that have undefined values', function () {
            ext_expect(new StatusLine_StatusLine('HTTP/1.1').toJSON(), 'not to have key', 'statusCode');
        });
    });
});
