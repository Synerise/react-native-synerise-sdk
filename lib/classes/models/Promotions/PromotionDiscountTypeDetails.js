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
var BaseModel_1 = require("../BaseModel");
var PromotionDiscountTypeDetails = /** @class */ (function (_super) {
    __extends(PromotionDiscountTypeDetails, _super);
    function PromotionDiscountTypeDetails(model) {
        var _this = _super.call(this, model) || this;
        _this.name = model.name;
        _this.outerScope = model.outerScope;
        _this.requiredItemsCount = model.requiredItemsCount;
        _this.discountedItemsCount = model.discountedItemsCount;
        return _this;
    }
    return PromotionDiscountTypeDetails;
}(BaseModel_1.BaseModel));
exports.PromotionDiscountTypeDetails = PromotionDiscountTypeDetails;
