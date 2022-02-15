"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionItemScopeToString = exports.PromotionItemScopeFromString = exports.PromotionItemScope = void 0;
var PromotionItemScope;
(function (PromotionItemScope) {
    PromotionItemScope["LineItem"] = "LINE_ITEM";
    PromotionItemScope["Basket"] = "BASKET";
})(PromotionItemScope || (PromotionItemScope = {}));
exports.PromotionItemScope = PromotionItemScope;
function PromotionItemScopeFromString(string) {
    if (string === PromotionItemScope.LineItem) {
        return PromotionItemScope.LineItem;
    }
    else if (string === PromotionItemScope.Basket) {
        return PromotionItemScope.Basket;
    }
    return PromotionItemScope.LineItem;
}
exports.PromotionItemScopeFromString = PromotionItemScopeFromString;
function PromotionItemScopeToString(promotionItemScope) {
    return promotionItemScope;
}
exports.PromotionItemScopeToString = PromotionItemScopeToString;
