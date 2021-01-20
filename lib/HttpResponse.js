var mod_HttpResponse = HttpResponse;
import { Message as Message_Message } from "./Message";
import { StatusLine as StatusLine_StatusLine } from "./StatusLine";
import ext_util_util from "util";
import ext__ from "underscore";

function HttpResponse(obj) {
    this.statusLine = new StatusLine_StatusLine();
    Message_Message.call(this, obj);
}

HttpResponse.propertyNames = Message_Message.propertyNames.concat(StatusLine_StatusLine.propertyNames).concat(['statusLine']);

ext_util_util.inherits(HttpResponse, Message_Message);

HttpResponse.prototype.isMessyHttpResponse = true;

HttpResponse.prototype.populate = function (obj) {
    if (typeof obj === 'number') {
        this.populateFromObject({ statusCode: obj });
    } else if (obj && typeof obj === 'object' && (typeof Buffer === 'undefined' || !Buffer.isBuffer(obj))) {
        this.populateFromObject(obj);
    } else {
        Message_Message.prototype.populate.call(this, obj);
    }
    return this;
};

HttpResponse.prototype.populateFromObject = function (obj) {
    Message_Message.prototype.populateFromObject.call(this, obj);
    if (typeof obj.statusLine !== 'undefined') {
        this.statusLine.populate(obj.statusLine);
    }
    this.statusLine.populateFromObject(obj);
    return this;
};

HttpResponse.prototype.populateFromString = function (str) {
    var matchStatusLine = str.match(/^([^\r\n]*)(\r\n?|\n\r?|$)/);

    if (matchStatusLine) {
        this.statusLine.populateFromString(matchStatusLine[1]);
        Message_Message.prototype.populateFromString.call(this, str.substr(matchStatusLine[0].length));
    }
    return this;
};

HttpResponse.prototype.populateFromBuffer = function (buffer) {
    var i = 0;
    while (i < buffer.length && buffer[i] !== 0x0d && buffer[i] !== 0x0a) {
        i += 1;
    }
    if (i > 0) {
        this.statusLine.populateFromString(buffer.slice(0, i).toString('ascii'));
    } else {
        return;
    }
    if (buffer[i] === 0x0d) {
        i += 1;
    }
    if (buffer[i] === 0x0a) {
        i += 1;
    }
    Message_Message.prototype.populateFromBuffer.call(this, buffer.slice(i));
    return this;
};

HttpResponse.prototype.clone = function () {
    return new HttpResponse({
        statusLine: this.statusLine.clone(),
        headers: this.headers.clone(),
        body: this.body // Not sure
    });
};

HttpResponse.prototype.toString = function (maxLineLength) {
    return this.statusLine.toString() + '\r\n' +
    Message_Message.prototype.toString.call(this, maxLineLength);
};

HttpResponse.prototype.equals = function (other) {
    return this === other || (
        other instanceof HttpResponse &&
        this.statusLine.equals(other.statusLine) &&
        Message_Message.prototype.equals.call(this, other)
    );
};

StatusLine_StatusLine.propertyNames.forEach(function (statusLinePropertyName) {
    Object.defineProperty(HttpResponse.prototype, statusLinePropertyName, {
        enumerable: true,
        get: function () {
            return this.statusLine[statusLinePropertyName];
        },
        set: function (value) {
            this.statusLine[statusLinePropertyName] = value;
        }
    });
});

HttpResponse.prototype.toJSON = function () {
    return ext__.extend(Message_Message.prototype.toJSON.call(this), this.statusLine.toJSON());
};

export { mod_HttpResponse as HttpResponse };
