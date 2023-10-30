"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionStatusToString = exports.PromotionStatusFromString = exports.PromotionStatus = void 0;
var PromotionStatus;
(function (PromotionStatus) {
    PromotionStatus["None"] = "NONE";
    PromotionStatus["Active"] = "ACTIVE";
    PromotionStatus["Assigned"] = "ASSIGNED";
    PromotionStatus["Redeemed"] = "REDEEMED";
})(PromotionStatus || (PromotionStatus = {}));
exports.PromotionStatus = PromotionStatus;
function PromotionStatusFromString(string) {
    if (string === PromotionStatus.Active) {
        return PromotionStatus.Active;
    }
    else if (string === PromotionStatus.Assigned) {
        return PromotionStatus.Assigned;
    }
    else if (string === PromotionStatus.Redeemed) {
        return PromotionStatus.Redeemed;
    }
    return PromotionStatus.None;
}
exports.PromotionStatusFromString = PromotionStatusFromString;
function PromotionStatusToString(status) {
    return status;
}
exports.PromotionStatusToString = PromotionStatusToString;
