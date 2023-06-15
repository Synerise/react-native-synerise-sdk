declare enum PromotionDiscountUsageTrigger {
    Transaction = "TRANSACTION",
    Redeem = "REDEEM"
}
declare function PromotionDiscountUsageTriggerFromString(string: string): PromotionDiscountUsageTrigger;
declare function PromotionDiscountUsageTriggerToString(trigger: PromotionDiscountUsageTrigger): string;
export { PromotionDiscountUsageTrigger, PromotionDiscountUsageTriggerFromString, PromotionDiscountUsageTriggerToString };
