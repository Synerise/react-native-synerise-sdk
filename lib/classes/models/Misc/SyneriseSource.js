"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyneriseSourceToString = exports.SyneriseSourceFromString = exports.SyneriseSource = void 0;
var SyneriseSource;
(function (SyneriseSource) {
    SyneriseSource["NotSpecified"] = "NOT_SPECIFIED";
    SyneriseSource["SimplePush"] = "SIMPLE_PUSH";
    SyneriseSource["Banner"] = "BANNER";
    SyneriseSource["Walkthrough"] = "WALKTHROUGH";
    SyneriseSource["InAppMessage"] = "IN_APP_MESSAGE";
})(SyneriseSource || (SyneriseSource = {}));
exports.SyneriseSource = SyneriseSource;
function SyneriseSourceFromString(string) {
    if (string === SyneriseSource.SimplePush) {
        return SyneriseSource.SimplePush;
    }
    else if (string === SyneriseSource.Banner) {
        return SyneriseSource.Banner;
    }
    else if (string === SyneriseSource.Walkthrough) {
        return SyneriseSource.Walkthrough;
    }
    else if (string === SyneriseSource.InAppMessage) {
        return SyneriseSource.InAppMessage;
    }
    return SyneriseSource.NotSpecified;
}
exports.SyneriseSourceFromString = SyneriseSourceFromString;
function SyneriseSourceToString(activity) {
    return activity;
}
exports.SyneriseSourceToString = SyneriseSourceToString;
