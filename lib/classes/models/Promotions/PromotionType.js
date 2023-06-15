"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromotionType;
(function (PromotionType) {
    PromotionType["Unknown"] = "UNKNOWN";
    PromotionType["MembersOnly"] = "MEMBERS_ONLY";
    PromotionType["Custom"] = "CUSTOM";
    PromotionType["General"] = "GENERAL";
    PromotionType["Handbill"] = "HANDBILL";
})(PromotionType || (PromotionType = {}));
exports.PromotionType = PromotionType;
function PromotionTypeFromString(string) {
    if (string === PromotionType.MembersOnly) {
        return PromotionType.MembersOnly;
    }
    else if (string === PromotionType.Custom) {
        return PromotionType.Custom;
    }
    else if (string === PromotionType.General) {
        return PromotionType.General;
    }
    else if (string === PromotionType.Handbill) {
        return PromotionType.Handbill;
    }
    return PromotionType.Unknown;
}
exports.PromotionTypeFromString = PromotionTypeFromString;
function PromotionTypeToString(type) {
    return type;
}
exports.PromotionTypeToString = PromotionTypeToString;
