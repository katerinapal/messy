"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpExchange = undefined;

var _HttpRequest = require("./HttpRequest");

var _HttpResponse = require("./HttpResponse");

function HttpExchange(obj) {
    obj = obj || {};
    if (typeof obj.request !== 'undefined') {
        this.request = obj.request instanceof _HttpRequest.HttpRequest ? obj.request : new _HttpRequest.HttpRequest(obj.request);
    }
    if (typeof obj.response !== 'undefined') {
        this.response = obj.response instanceof _HttpResponse.HttpResponse ? obj.response : new _HttpResponse.HttpResponse(obj.response);
    }
}

HttpExchange.prototype.isMessyHttpExchange = true;

HttpExchange.prototype.clone = function () {
    return new HttpExchange({
        request: this.request && this.request.clone(),
        response: this.response && this.response.clone()
    });
};

HttpExchange.prototype.toString = function (maxLineLength) {
    return (this.request ? this.request.toString(maxLineLength) : '<no request>') + '\r\n\r\n' + (this.response ? this.response.toString(maxLineLength) : '<no response>');
};

HttpExchange.prototype.equals = function (other) {
    return this === other || other instanceof HttpExchange && (this.request === other.request || this.request && other.request && this.request.equals(other.request)) && (this.response === other.response || this.response && other.response && this.response.equals(other.response));
};

HttpExchange.prototype.toJSON = function () {
    var obj = {};
    if (this.request) {
        obj.request = this.request.toJSON();
    }
    if (this.response) {
        obj.response = this.response.toJSON();
    }
    return obj;
};

var exported_HttpExchange = HttpExchange;
exports.HttpExchange = exported_HttpExchange;
