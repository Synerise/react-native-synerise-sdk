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
exports.ClientAgreements = void 0;
var BaseModel_1 = require("./../BaseModel");
var ClientAgreements = /** @class */ (function (_super) {
    __extends(ClientAgreements, _super);
    function ClientAgreements(modelObject) {
        var _this = _super.call(this, modelObject || {}) || this;
        _this.email = modelObject === null || modelObject === void 0 ? void 0 : modelObject.email;
        _this.sms = modelObject === null || modelObject === void 0 ? void 0 : modelObject.sms;
        _this.push = modelObject === null || modelObject === void 0 ? void 0 : modelObject.push;
        _this.bluetooth = modelObject === null || modelObject === void 0 ? void 0 : modelObject.bluetooth;
        _this.rfid = modelObject === null || modelObject === void 0 ? void 0 : modelObject.rfid;
        _this.wifi = modelObject === null || modelObject === void 0 ? void 0 : modelObject.wifi;
        return _this;
    }
    ClientAgreements.prototype.toObject = function () {
        return {
            email: this.email,
            sms: this.sms,
            push: this.push,
            bluetooth: this.bluetooth,
            rfid: this.rfid,
            wifi: this.wifi
        };
    };
    return ClientAgreements;
}(BaseModel_1.BaseModel));
exports.ClientAgreements = ClientAgreements;
