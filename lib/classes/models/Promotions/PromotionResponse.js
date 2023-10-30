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
exports.PromotionResponse = void 0;
var BaseModel_1 = require("../BaseModel");
var Promotion_1 = require("./../Promotions/Promotion");
var PromotionResponse = /** @class */ (function (_super) {
    __extends(PromotionResponse, _super);
    function PromotionResponse(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.totalCount = modelObject.totalCount;
        _this.totalPages = modelObject.totalPages;
        _this.page = modelObject.page;
        _this.limit = modelObject.limit;
        _this.code = modelObject.code;
        _this.items = new Array();
        if (modelObject.items instanceof Array) {
            var i = 0;
            for (i = 0; i < modelObject.items.length; i++) {
                var promotion = new Promotion_1.Promotion(modelObject.items[i]);
                _this.items.push(promotion);
            }
        }
        return _this;
    }
    return PromotionResponse;
}(BaseModel_1.BaseModel));
exports.PromotionResponse = PromotionResponse;
