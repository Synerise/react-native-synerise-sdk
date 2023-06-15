"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PromotionDiscountUsageTrigger;
(function (PromotionDiscountUsageTrigger) {
    PromotionDiscountUsageTrigger["Transaction"] = "TRANSACTION";
    PromotionDiscountUsageTrigger["Redeem"] = "REDEEM";
})(PromotionDiscountUsageTrigger || (PromotionDiscountUsageTrigger = {}));
exports.PromotionDiscountUsageTrigger = PromotionDiscountUsageTrigger;
function PromotionDiscountUsageTriggerFromString(string) {
    if (string === PromotionDiscountUsageTrigger.Transaction) {
        return PromotionDiscountUsageTrigger.Transaction;
    }
    else if (string === PromotionDiscountUsageTrigger.Redeem) {
        return PromotionDiscountUsageTrigger.Redeem;
    }
    return PromotionDiscountUsageTrigger.Transaction;
}
exports.PromotionDiscountUsageTriggerFromString = PromotionDiscountUsageTriggerFromString;
function PromotionDiscountUsageTriggerToString(trigger) {
    return trigger;
}
exports.PromotionDiscountUsageTriggerToString = PromotionDiscountUsageTriggerToString;
