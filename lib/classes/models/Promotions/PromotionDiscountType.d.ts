declare enum PromotionDiscountType {
    None = "NONE",
    Percent = "PERCENT",
    Amount = "AMOUNT",
    TwoForOne = "2_FOR_1",
    Points = "POINTS",
    Multibuy = "MULTIBUY"
}
declare function PromotionDiscountTypeFromString(string: String): PromotionDiscountType;
declare function PromotionDiscountTypeToString(promotionDiscountType: PromotionDiscountType): String;
export { PromotionDiscountType, PromotionDiscountTypeFromString, PromotionDiscountTypeToString };
