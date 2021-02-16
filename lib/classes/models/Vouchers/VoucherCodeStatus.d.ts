declare enum VoucherCodeStatus {
    Unassigned = "UNASSIGNED",
    Assigned = "ASSIGNED",
    Redeemed = "REDEEMED",
    Canceled = "CANCELED"
}
declare function VoucherCodeStatusFromString(string: string): VoucherCodeStatus;
declare function VoucherCodeStatusToString(voucherCodeStatus: VoucherCodeStatus): string;
export { VoucherCodeStatus, VoucherCodeStatusFromString, VoucherCodeStatusToString };
