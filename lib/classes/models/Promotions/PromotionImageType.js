"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromotionImageType;
(function (PromotionImageType) {
    PromotionImageType["Image"] = "image";
    PromotionImageType["Thumbnail"] = "thumbnail";
})(PromotionImageType || (PromotionImageType = {}));
exports.PromotionImageType = PromotionImageType;
function PromotionImageTypeFromString(string) {
    if (string === PromotionImageType.Image) {
        return PromotionImageType.Image;
    }
    else if (string === PromotionImageType.Thumbnail) {
        return PromotionImageType.Thumbnail;
    }
    return PromotionImageType.Image;
}
exports.PromotionImageTypeFromString = PromotionImageTypeFromString;
function PromotionImageTypeToString(type) {
    return type;
}
exports.PromotionImageTypeToString = PromotionImageTypeToString;