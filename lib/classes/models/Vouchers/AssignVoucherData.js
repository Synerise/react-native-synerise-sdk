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
var AssignVoucherData = /** @class */ (function (_super) {
    __extends(AssignVoucherData, _super);
    function AssignVoucherData(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.code = modelObject.code;
        if (modelObject.expireIn !== undefined && modelObject.expireIn !== null) {
            _this.expireIn = new Date(modelObject.expireIn * 1000);
        }
        if (modelObject.redeemAt !== undefined && modelObject.redeemAt !== null) {
            _this.redeemAt = new Date(modelObject.redeemAt * 1000);
        }
        if (modelObject.assignedAt !== undefined && modelObject.assignedAt !== null) {
            _this.assignedAt = new Date(modelObject.assignedAt * 1000);
        }
        _this.createdAt = new Date(modelObject.createdAt * 1000);
        _this.updatedAt = new Date(modelObject.updatedAt * 1000);
        return _this;
    }
    return AssignVoucherData;
}(BaseModel_1.BaseModel));
exports.AssignVoucherData = AssignVoucherData;
