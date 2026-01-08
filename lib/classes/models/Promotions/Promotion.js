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
exports.PromotionSortingKey = exports.Promotion = void 0;
var BaseModel_1 = require("../BaseModel");
var PromotionStatus_1 = require("./../Promotions/PromotionStatus");
var PromotionType_1 = require("./../Promotions/PromotionType");
var PromotionDetails_1 = require("./PromotionDetails");
var PromotionDiscountType_1 = require("./../Promotions/PromotionDiscountType");
var PromotionDiscountMode_1 = require("./../Promotions/PromotionDiscountMode");
var PromotionDiscountModeDetails_1 = require("./PromotionDiscountModeDetails");
var PromotionVoucherData_1 = require("./PromotionVoucherData");
var PromotionItemScope_1 = require("./../Promotions/PromotionItemScope");
var PromotionImage_1 = require("./PromotionImage");
var PromotionSortingKey = {
    ExpireAt: 'expireAt',
    CreatedAt: 'createdAt',
    LastingAt: 'lastingAt',
    RequireRedeemPoints: 'requireRedeemedPoints',
    UpdatedAt: 'updatedAt',
    Type: 'type',
    Priority: 'priority'
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
        if (modelObject.details !== undefined && modelObject.details != null) {
            _this.details = new PromotionDetails_1.PromotionDetails(modelObject.details);
        }
        _this.redeemLimitPerClient = modelObject.redeemLimitPerClient;
        _this.redeemQuantityPerActivation = modelObject.redeemQuantityPerActivation;
        _this.currentRedeemedQuantity = modelObject.currentRedeemedQuantity;
        _this.currentRedeemLimit = modelObject.currentRedeemLimit;
        _this.activationCounter = modelObject.activationCounter;
        _this.possibleRedeems = modelObject.possibleRedeems;
        _this.discountType = PromotionDiscountType_1.PromotionDiscountTypeFromString(modelObject.discountType);
        _this.discountValue = modelObject.discountValue;
        _this.discountMode = PromotionDiscountMode_1.PromotionDiscountModeFromString(modelObject.discountMode);
        if (modelObject.discountModeDetails !== undefined && modelObject.discountModeDetails != null) {
            _this.discountModeDetails = new PromotionDiscountModeDetails_1.PromotionDiscountModeDetails(modelObject.discountModeDetails);
        }
        _this.requireRedeemedPoints = modelObject.requireRedeemedPoints;
        _this.price = modelObject.price;
        _this.priority = modelObject.priority;
        _this.itemScope = PromotionItemScope_1.PromotionItemScopeFromString(modelObject.itemScope);
        _this.minBasketValue = modelObject.minBasketValue;
        _this.maxBasketValue = modelObject.maxBasketValue;
        _this.vouchers = new Array();
        if (modelObject.vouchers instanceof Array) {
            var i = 0;
            for (i = 0; i < modelObject.vouchers.length; i++) {
                var promotionVoucherData = new PromotionVoucherData_1.PromotionVoucherData(modelObject.vouchers[i]);
                _this.vouchers.push(promotionVoucherData);
            }
        }
        _this.name = modelObject.name;
        _this.headline = modelObject.headline;
        _this.descriptionText = modelObject.descriptionText;
        _this.images = new Array();
        if (modelObject.images instanceof Array) {
            var i = 0;
            for (i = 0; i < modelObject.images.length; i++) {
                var promotionImage = new PromotionImage_1.PromotionImage(modelObject.images[i]);
                _this.images.push(promotionImage);
            }
        }
        if (modelObject.startAt !== undefined && modelObject.startAt != null) {
            _this.startAt = new Date(modelObject.startAt * 1000);
        }
        if (modelObject.expireAt !== undefined && modelObject.expireAt != null) {
            _this.expireAt = new Date(modelObject.expireAt * 1000);
        }
        if (modelObject.lastingAt !== undefined && modelObject.lastingAt != null) {
            _this.lastingAt = new Date(modelObject.lastingAt * 1000);
        }
        if (modelObject.assignedAt !== undefined && modelObject.assignedAt != null) {
            _this.assignedAt = new Date(modelObject.assignedAt * 1000);
        }
        _this.lastingTime = modelObject.lastingTime;
        _this.displayFrom = modelObject.displayFrom;
        _this.displayTo = modelObject.displayTo;
        _this.params = modelObject.params;
        _this.catalogIndexItems = modelObject.catalogIndexItems;
        _this.tags = modelObject.tags;
        return _this;
    }
    return Promotion;
}(BaseModel_1.BaseModel));
exports.Promotion = Promotion;
