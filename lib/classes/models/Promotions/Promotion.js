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
var PromotionStatus_1 = require("./../Promotions/PromotionStatus");
var PromotionType_1 = require("./../Promotions/PromotionType");
var PromotionDiscountType_1 = require("./../Promotions/PromotionDiscountType");
var PromotionSortingKey = {
    ExpireAt: "expireAt",
    CreatedAt: "createdAt",
    LastingAt: "lastingAt",
    RequireRedeemPoints: "requireRedeemedPoints",
    UpdatedAt: "updatedAt",
    Type: "type"
};
exports.PromotionSortingKey = PromotionSortingKey;
var Promotion = /** @class */ (function (_super) {
    __extends(Promotion, _super);
    function Promotion(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.uuid = modelObject.uuid;
        _this.code = modelObject.code;
        _this.status = PromotionStatus_1.PromotionStatusFromString(modelObject.status);
        _this.type = PromotionType_1.PromotionTypeFromString(modelObject.type);
        _this.redeemLimitPerClient = modelObject.redeemLimitPerClient;
        _this.redeemQuantityPerActivation = modelObject.redeemQuantityPerActivation;
        _this.currentRedeemedQuantity = modelObject.currentRedeemedQuantity;
        _this.currentRedeemLimit = modelObject.currentRedeemLimit;
        _this.activationCounter = modelObject.activationCounter;
        _this.discountType = PromotionDiscountType_1.PromotionDiscountTypeFromString(modelObject.discountType);
        _this.discountValue = modelObject.discountValue;
        _this.requireRedeemedPoints = modelObject.requireRedeemedPoints;
        _this.price = modelObject.price;
        _this.name = modelObject.name;
        _this.headline = modelObject.headline;
        _this.descriptionText = modelObject.descriptionText;
        _this.images = modelObject.images;
        _this.startAt = new Date(modelObject.startAt * 1000);
        _this.expireAt = new Date(modelObject.expireAt * 1000);
        _this.lastingAt = new Date(modelObject.lastingAt * 1000);
        _this.params = modelObject.params;
        _this.catalogIndexItems = modelObject.catalogIndexItems;
        return _this;
    }
    return Promotion;
}(BaseModel_1.BaseModel));
exports.Promotion = Promotion;
