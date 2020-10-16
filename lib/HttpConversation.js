var HttpConversation_HttpConversation = HttpConversation;
import { HttpExchange as HttpExchange_HttpExchangejs } from "./HttpExchange";

function HttpConversation(obj) {
    obj = obj || {};
    this.exchanges = (obj.exchanges || []).map(function (httpExchange) {
        if (httpExchange instanceof HttpExchange_HttpExchangejs) {
            return httpExchange;
        } else {
            return new HttpExchange_HttpExchangejs(httpExchange);
        }
    });
}

HttpConversation.prototype.isMessyHttpConversation = true;

HttpConversation.prototype.clone = function () {
    return new HttpConversation({
        exchanges: this.exchanges.map(function (httpExchange) {
            return httpExchange.clone();
        })
    });
};

HttpConversation.prototype.toString = function (maxLineLength) {
    return this.exchanges.map(function (httpExchange) {
        return httpExchange.toString(maxLineLength);
    }).join('\r\n\r\n');
};

HttpConversation.prototype.equals = function (other) {
    return this === other || (
        other instanceof HttpConversation &&
        this.exchanges.length === other.exchanges.length &&
        this.exchanges.every(function (httpExchange, i) {
            return httpExchange.equals(other.exchanges[i]);
        })
    );
};

HttpConversation.prototype.toJSON = function () {
    return {
        exchanges: this.exchanges.map(function (exchange) {
            return exchange.toJSON();
        })
    };
};

export { HttpConversation_HttpConversation as HttpConversation };
