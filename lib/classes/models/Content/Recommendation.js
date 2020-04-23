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
var RecommendationAttribute_1 = require("./RecommendationAttribute");
var Recommendation = /** @class */ (function (_super) {
    __extends(Recommendation, _super);
    function Recommendation(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.productRetailerPartNo = modelObject.productRetailerPartNo;
        _this.title = modelObject.title;
        _this.brand = modelObject.brand;
        _this.category = modelObject.category;
        _this.description = modelObject.description;
        _this.gender = modelObject.gender;
        _this.color = modelObject.color;
        _this.effectivePrice = modelObject.effectivePrice;
        _this.priceCurrency = modelObject.priceCurrency;
        _this.priceValue = modelObject.priceValue;
        _this.salePriceValue = modelObject.salePriceValue;
        _this.imageLink = modelObject.imageLink;
        _this.link = modelObject.link;
        _this.sizes = modelObject.sizes;
        _this.additionalImageLinks = modelObject.additionalImageLinks;
        _this.customAttributes = new Array();
        if (modelObject.customAttributes instanceof Array) {
            var i = 0;
            for (i = 0; i < modelObject.customAttributes.length; i++) {
                var customAttribute = new RecommendationAttribute_1.RecommendationAttribute(modelObject.customAttributes[i]);
                _this.customAttributes.push(customAttribute);
            }
        }
        return _this;
    }
    return Recommendation;
}(BaseModel_1.BaseModel));
exports.Recommendation = Recommendation;
