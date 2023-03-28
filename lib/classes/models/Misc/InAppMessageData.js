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
exports.InAppMessageData = void 0;
var BaseModel_1 = require("./../BaseModel");
var InAppMessageData = /** @class */ (function (_super) {
    __extends(InAppMessageData, _super);
    function InAppMessageData(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.campaignHash = modelObject.campaignHash;
        _this.variantIdentifier = modelObject.variantIdentifier;
        _this.additionalParameters = modelObject.additionalParameters;
        _this.isTest = modelObject.isTest;
        return _this;
    }
    return InAppMessageData;
}(BaseModel_1.BaseModel));
exports.InAppMessageData = InAppMessageData;
