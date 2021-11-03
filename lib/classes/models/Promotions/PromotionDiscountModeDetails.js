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
exports.PromotionDiscountModeDetails = void 0;
var BaseModel_1 = require("../BaseModel");
var PromotionDiscountStep_1 = require("./PromotionDiscountStep");
var PromotionDiscountUsageTrigger_1 = require("./PromotionDiscountUsageTrigger");
var PromotionDiscountModeDetails = /** @class */ (function (_super) {
    __extends(PromotionDiscountModeDetails, _super);
    function PromotionDiscountModeDetails(model) {
        var _this = _super.call(this, model) || this;
        _this.discountUsageTrigger = PromotionDiscountUsageTrigger_1.PromotionDiscountUsageTriggerFromString(model.discountUsageTrigger);
        _this.discountSteps = new Array();
        if (model.discountSteps instanceof Array) {
            var i = 0;
            for (i = 0; i < model.discountSteps.length; i++) {
                var discountStep = new PromotionDiscountStep_1.PromotionDiscountStep(model.discountSteps[i]);
                _this.discountSteps.push(discountStep);
            }
        }
        return _this;
    }
    return PromotionDiscountModeDetails;
}(BaseModel_1.BaseModel));
exports.PromotionDiscountModeDetails = PromotionDiscountModeDetails;
