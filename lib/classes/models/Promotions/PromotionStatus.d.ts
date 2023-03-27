declare enum PromotionStatus {
    None = "NONE",
    Active = "ACTIVE",
    Assigned = "ASSIGNED",
    Redeemed = "REDEEMED"
}
declare function PromotionStatusFromString(string: string): PromotionStatus;
declare function PromotionStatusToString(promotionStatus: PromotionStatus): string;
export { PromotionStatus, PromotionStatusFromString, PromotionStatusToString };
