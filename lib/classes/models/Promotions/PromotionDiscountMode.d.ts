declare enum PromotionDiscountMode {
    Static = "STATIC",
    Step = "STEP"
}
declare function PromotionDiscountModeFromString(string: string): PromotionDiscountMode;
declare function PromotionDiscountModeToString(promotionItemScope: PromotionDiscountMode): string;
export { PromotionDiscountMode, PromotionDiscountModeToString, PromotionDiscountModeFromString };
