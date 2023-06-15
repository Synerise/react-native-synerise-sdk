declare enum VoucherCodeStatus {
    Unassigned = "UNASSIGNED",
    Assigned = "ASSIGNED",
    Redeemed = "REDEEMED",
    Canceled = "CANCELED"
}
declare function VoucherCodeStatusFromString(string: string): VoucherCodeStatus;
declare function VoucherCodeStatusToString(status: VoucherCodeStatus): string;
export { VoucherCodeStatus, VoucherCodeStatusFromString, VoucherCodeStatusToString };
