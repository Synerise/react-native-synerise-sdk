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
var VoucherCodesData_1 = require("./VoucherCodesData");
var VoucherCodesResponse = /** @class */ (function (_super) {
    __extends(VoucherCodesResponse, _super);
    function VoucherCodesResponse(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.data = new Array();
        if (modelObject.data instanceof Array) {
            var i = 0;
            for (i = 0; i < modelObject.data.length; i++) {
                var voucherCodesData = new VoucherCodesData_1.VoucherCodesData(modelObject.data[i]);
                _this.data.push(voucherCodesData);
            }
        }
        return _this;
    }
    return VoucherCodesResponse;
}(BaseModel_1.BaseModel));
exports.VoucherCodesResponse = VoucherCodesResponse;
