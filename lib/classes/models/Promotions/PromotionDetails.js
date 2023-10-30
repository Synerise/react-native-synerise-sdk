"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionDetails = void 0;
var BaseModel_1 = require("../BaseModel");
var PromotionDiscountTypeDetails_1 = require("./PromotionDiscountTypeDetails");
var PromotionDetails = /** @class */ (function (_super) {
    __extends(PromotionDetails, _super);
    function PromotionDetails(model) {
        var _this = _super.call(this, model) || this;
        if (model.discountType !== undefined && model.discountType !== null) {
            _this.discountType = new PromotionDiscountTypeDetails_1.PromotionDiscountTypeDetails(model.discountType);
        }
        return _this;
    }
    return PromotionDetails;
}(BaseModel_1.BaseModel));
exports.PromotionDetails = PromotionDetails;
