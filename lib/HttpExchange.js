import { HttpRequest as HttpRequest_HttpRequestjs } from "./HttpRequest";
import { HttpResponse as HttpResponse_HttpResponsejs } from "./HttpResponse";

function HttpExchange(obj) {
    obj = obj || {};
    if (typeof obj.request !== 'undefined') {
        this.request = obj.request instanceof HttpRequest_HttpRequestjs ? obj.request : new HttpRequest_HttpRequestjs(obj.request);
    }
    if (typeof obj.response !== 'undefined') {
        this.response = obj.response instanceof HttpResponse_HttpResponsejs ? obj.response : new HttpResponse_HttpResponsejs(obj.response);
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
    return (
        (this.request ? this.request.toString(maxLineLength) : '<no request>') + '\r\n\r\n' +
        (this.response ? this.response.toString(maxLineLength) : '<no response>')
    );
};

HttpExchange.prototype.equals = function (other) {
    return this === other ||  (
        other instanceof HttpExchange &&
        (this.request === other.request || (this.request && other.request && this.request.equals(other.request))) &&
        (this.response === other.response || (this.response && other.response && this.response.equals(other.response)))
    );
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
export { exported_HttpExchange as HttpExchange };
