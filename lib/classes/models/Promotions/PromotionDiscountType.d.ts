declare enum PromotionDiscountType {
    None = "NONE",
    Percent = "PERCENT",
    Amount = "AMOUNT",
    TwoForOne = "2_FOR_1",
    Points = "POINTS",
    Multibuy = "MULTIBUY",
    ExactPrice = "EXACT_PRICE"
}
declare function PromotionDiscountTypeFromString(string: string): PromotionDiscountType;
declare function PromotionDiscountTypeToString(promotionDiscountType: PromotionDiscountType): string;
export { PromotionDiscountType, PromotionDiscountTypeFromString, PromotionDiscountTypeToString };
