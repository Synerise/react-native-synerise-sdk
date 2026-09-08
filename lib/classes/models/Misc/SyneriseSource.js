"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyneriseSourceToString = exports.SyneriseSourceFromString = exports.SyneriseSource = void 0;
var SyneriseSource;
(function (SyneriseSource) {
    SyneriseSource["NotSpecified"] = "NOT_SPECIFIED";
    SyneriseSource["SimplePush"] = "SIMPLE_PUSH";
    SyneriseSource["InAppMessage"] = "IN_APP_MESSAGE";
    SyneriseSource["InlineInAppMessage"] = "INLINE_IN_APP_MESSAGE";
})(SyneriseSource || (SyneriseSource = {}));
exports.SyneriseSource = SyneriseSource;
function SyneriseSourceFromString(string) {
    if (string === SyneriseSource.SimplePush) {
        return SyneriseSource.SimplePush;
    }
    else if (string === SyneriseSource.InAppMessage) {
        return SyneriseSource.InAppMessage;
    }
    else if (string === SyneriseSource.InlineInAppMessage) {
        return SyneriseSource.InlineInAppMessage;
    }
    return SyneriseSource.NotSpecified;
}
exports.SyneriseSourceFromString = SyneriseSourceFromString;
function SyneriseSourceToString(source) {
    return source;
}
exports.SyneriseSourceToString = SyneriseSourceToString;
