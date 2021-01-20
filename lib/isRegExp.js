'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var mod_anonymus = function isRegExp(re) {
    var s;
    try {
        s = '' + re;
    } catch (e) {
        return false;
    }

    return re instanceof RegExp || // easy case
    // duck-type for context-switching evalcx case
    typeof re === 'function' && re.constructor.name === 'RegExp' && re.compile && re.test && re.exec && s.match(/^\/.*\/[gim]{0,3}$/);
};

exports.isRegExp = mod_anonymus;