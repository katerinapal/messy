"use strict";

var _unexpected = require("unexpected");

var _unexpected2 = _interopRequireDefault(_unexpected);

var _Mail = require("../lib/Mail");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Mail', function () {
    it('should rfc2047 decode the header values', function () {
        var mail = new _Mail.Mail('Subject: =?iso-8859-1?Q?=A1?=Hola, se=?iso-8859-1?Q?=F1?=or!');
        (0, _unexpected2.default)(mail.headers.get('subject'), 'to equal', '¡Hola, señor!');
    });

    it('should rfc2047 encode when serializing', function () {
        var mail = new _Mail.Mail({ body: 'bar' });
        mail.headers.set('subject', '¡Hola, señor!');
        (0, _unexpected2.default)(mail.toString(), 'to equal', 'Subject: =?utf-8?Q?=C2=A1Hola=2C?= =?utf-8?Q?_se=C3=B1or!?=\r\n\r\nbar');
    });

    describe('#fileName', function () {
        describe('when invoked as a getter', function () {
            it('should fall back to the name property of the Content-Type header when the Content-Disposition header has no filename parameter', function () {
                var mail = new _Mail.Mail('Content-Transfer-Encoding: base64\r\n' + 'Content-Disposition: attachment\r\n' + 'Content-Type: image/png; name="=?iso-8859-1?Q?=E6=F8=E5.png?="');
                (0, _unexpected2.default)(mail.fileName, 'to equal', 'æøå.png');
            });

            it('should fall back to the name property of the Content-Type header when there is no Content-Disposition header', function () {
                var mail = new _Mail.Mail('Content-Transfer-Encoding: base64\r\n' + 'Content-Type: image/png; name="=?iso-8859-1?Q?=E6=F8=E5.png?="');
                (0, _unexpected2.default)(mail.fileName, 'to equal', 'æøå.png');
            });
        });

        describe('when invoked as a setter', function () {
            it('should update the name property of the Content-Type header if available', function () {
                var mail = new _Mail.Mail({ headers: { 'Content-Type': 'image/png' } });
                mail.fileName = 'æøå.png';
                (0, _unexpected2.default)(mail.toString(), 'to equal',
                // TODO: Would be better to emit 'Content-Type: image/png; name="=?iso-8859-1?Q?=E6=F8=E5.png?="\r\n' +
                'Content-Type: image/png; =?utf-8?Q?name=3D=C3=A6=C3=B8=C3=A5?=.png\r\n' + "Content-Disposition: attachment; filename*=iso-8859-1''%E6%F8%E5.png\r\n");
            });
        });
    });
});