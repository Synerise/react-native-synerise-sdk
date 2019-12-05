declare enum PromotionType {
    Unknown = "UNKNOWN",
    MembersOnly = "MEMBERS_ONLY",
    Custom = "CUSTOM",
    General = "GENERAL"
}
declare function PromotionTypeFromString(string: String): PromotionType;
declare function PromotionTypeToString(promotionType: PromotionType): String;
export { PromotionType, PromotionTypeFromString, PromotionTypeToString };
