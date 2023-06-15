declare enum PromotionDiscountMode {
    Static = "STATIC",
    Step = "STEP"
}
declare function PromotionDiscountModeFromString(string: string): PromotionDiscountMode;
declare function PromotionDiscountModeToString(mode: PromotionDiscountMode): string;
export { PromotionDiscountMode, PromotionDiscountModeToString, PromotionDiscountModeFromString };
