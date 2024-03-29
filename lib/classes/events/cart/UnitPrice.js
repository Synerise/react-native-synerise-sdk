"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnitPrice = void 0;
var UnitPrice = /** @class */ (function () {
    function UnitPrice(amount, currency) {
        this.amount = amount;
        this.currency = currency;
    }
    UnitPrice.prototype.toObject = function () {
        return {
            amount: this.amount,
            currency: this.currency,
        };
    };
    return UnitPrice;
}());
exports.UnitPrice = UnitPrice;
