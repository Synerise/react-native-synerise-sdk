declare enum PromotionStatus {
    None = "NONE",
    Active = "ACTIVE",
    Assigned = "ASSIGNED",
    Redeemed = "REDEEMED"
}
declare function PromotionStatusFromString(string: String): PromotionStatus;
declare function PromotionStatusToString(promotionStatus: PromotionStatus): String;
export { PromotionStatus, PromotionStatusFromString, PromotionStatusToString };
