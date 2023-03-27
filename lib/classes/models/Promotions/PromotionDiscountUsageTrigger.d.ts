declare enum PromotionDiscountUsageTrigger {
    Transaction = "TRANSACTION",
    Redeem = "REDEEM"
}
declare function PromotionDiscountUsageTriggerFromString(string: string): PromotionDiscountUsageTrigger;
declare function PromotionDiscountUsageTriggerToString(promotionItemScope: PromotionDiscountUsageTrigger): string;
export { PromotionDiscountUsageTrigger, PromotionDiscountUsageTriggerFromString, PromotionDiscountUsageTriggerToString };
