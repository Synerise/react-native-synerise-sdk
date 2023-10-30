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
exports.VoucherCodesData = void 0;
var BaseModel_1 = require("../BaseModel");
var VoucherCodeStatus_1 = require("./VoucherCodeStatus");
var VoucherCodesData = /** @class */ (function (_super) {
    __extends(VoucherCodesData, _super);
    function VoucherCodesData(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.code = modelObject.code;
        _this.status = VoucherCodeStatus_1.VoucherCodeStatusFromString(modelObject.status);
        _this.clientId = modelObject.clientId;
        if (modelObject.clientUuid !== undefined && modelObject.clientUuid !== null) {
            _this.clientUuid = modelObject.clientUuid;
        }
        _this.poolUuid = modelObject.poolUuid;
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
    return VoucherCodesData;
}(BaseModel_1.BaseModel));
exports.VoucherCodesData = VoucherCodesData;
