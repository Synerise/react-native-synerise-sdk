"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var VoucherCodeStatus;
(function (VoucherCodeStatus) {
    VoucherCodeStatus["Unassigned"] = "UNASSIGNED";
    VoucherCodeStatus["Assigned"] = "ASSIGNED";
    VoucherCodeStatus["Redeemed"] = "REDEEMED";
    VoucherCodeStatus["Canceled"] = "CANCELED";
})(VoucherCodeStatus || (VoucherCodeStatus = {}));
exports.VoucherCodeStatus = VoucherCodeStatus;
function VoucherCodeStatusFromString(string) {
    if (string === VoucherCodeStatus.Unassigned) {
        return VoucherCodeStatus.Unassigned;
    }
    else if (string === VoucherCodeStatus.Assigned) {
        return VoucherCodeStatus.Assigned;
    }
    else if (string === VoucherCodeStatus.Redeemed) {
        return VoucherCodeStatus.Redeemed;
    }
    else if (string === VoucherCodeStatus.Canceled) {
        return VoucherCodeStatus.Canceled;
    }
    return VoucherCodeStatus.Unassigned;
}
exports.VoucherCodeStatusFromString = VoucherCodeStatusFromString;
function VoucherCodeStatusToString(status) {
    return status;
}
exports.VoucherCodeStatusToString = VoucherCodeStatusToString;
