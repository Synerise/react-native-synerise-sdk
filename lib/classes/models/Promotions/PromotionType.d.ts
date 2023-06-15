declare enum PromotionType {
    Unknown = "UNKNOWN",
    MembersOnly = "MEMBERS_ONLY",
    Custom = "CUSTOM",
    General = "GENERAL",
    Handbill = "HANDBILL"
}
declare function PromotionTypeFromString(string: string): PromotionType;
declare function PromotionTypeToString(type: PromotionType): string;
export { PromotionType, PromotionTypeFromString, PromotionTypeToString };
