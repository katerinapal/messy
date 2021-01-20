"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpResponse = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _Message = require("./Message");

var _StatusLine = require("./StatusLine");

var _util = require("util");

var _util2 = _interopRequireDefault(_util);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mod_HttpResponse = HttpResponse;


function HttpResponse(obj) {
    this.statusLine = new _StatusLine.StatusLine();
    _Message.Message.call(this, obj);
}

HttpResponse.propertyNames = _Message.Message.propertyNames.concat(_StatusLine.StatusLine.propertyNames).concat(['statusLine']);

_util2.default.inherits(HttpResponse, _Message.Message);

HttpResponse.prototype.isMessyHttpResponse = true;

HttpResponse.prototype.populate = function (obj) {
    if (typeof obj === 'number') {
        this.populateFromObject({ statusCode: obj });
    } else if (obj && (typeof obj === "undefined" ? "undefined" : _typeof(obj)) === 'object' && (typeof Buffer === 'undefined' || !Buffer.isBuffer(obj))) {
        this.populateFromObject(obj);
    } else {
        _Message.Message.prototype.populate.call(this, obj);
    }
    return this;
};

HttpResponse.prototype.populateFromObject = function (obj) {
    _Message.Message.prototype.populateFromObject.call(this, obj);
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
        _Message.Message.prototype.populateFromString.call(this, str.substr(matchStatusLine[0].length));
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
    _Message.Message.prototype.populateFromBuffer.call(this, buffer.slice(i));
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
    return this.statusLine.toString() + '\r\n' + _Message.Message.prototype.toString.call(this, maxLineLength);
};

HttpResponse.prototype.equals = function (other) {
    return this === other || other instanceof HttpResponse && this.statusLine.equals(other.statusLine) && _Message.Message.prototype.equals.call(this, other);
};

_StatusLine.StatusLine.propertyNames.forEach(function (statusLinePropertyName) {
    Object.defineProperty(HttpResponse.prototype, statusLinePropertyName, {
        enumerable: true,
        get: function get() {
            return this.statusLine[statusLinePropertyName];
        },
        set: function set(value) {
            this.statusLine[statusLinePropertyName] = value;
        }
    });
});

HttpResponse.prototype.toJSON = function () {
    return _underscore2.default.extend(_Message.Message.prototype.toJSON.call(this), this.statusLine.toJSON());
};

exports.HttpResponse = mod_HttpResponse;