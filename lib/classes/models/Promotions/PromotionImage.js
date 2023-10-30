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
exports.PromotionImage = void 0;
var BaseModel_1 = require("../BaseModel");
var PromotionImageType_1 = require("./PromotionImageType");
var PromotionImage = /** @class */ (function (_super) {
    __extends(PromotionImage, _super);
    function PromotionImage(model) {
        var _this = _super.call(this, model) || this;
        _this.url = model.url;
        _this.type = PromotionImageType_1.PromotionImageTypeFromString(model.type);
        return _this;
    }
    return PromotionImage;
}(BaseModel_1.BaseModel));
exports.PromotionImage = PromotionImage;
