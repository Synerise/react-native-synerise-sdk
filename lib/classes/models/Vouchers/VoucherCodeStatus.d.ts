declare enum VoucherCodeStatus {
    Unassigned = "UNASSIGNED",
    Assigned = "ASSIGNED",
    Redeemed = "REDEEMED",
    Canceled = "CANCELED"
}
declare function VoucherCodeStatusFromString(string: String): VoucherCodeStatus;
declare function VoucherCodeStatusToString(voucherCodeStatus: VoucherCodeStatus): String;
export { VoucherCodeStatus, VoucherCodeStatusFromString, VoucherCodeStatusToString };
