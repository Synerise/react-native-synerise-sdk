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
var BaseModel_1 = require("./../BaseModel");
var ClientAgreements = /** @class */ (function (_super) {
    __extends(ClientAgreements, _super);
    function ClientAgreements(modelObject) {
        var _a, _b, _c, _d, _e, _f;
        var _this = _super.call(this, modelObject || {}) || this;
        _this.email = (_a = modelObject) === null || _a === void 0 ? void 0 : _a.email;
        _this.sms = (_b = modelObject) === null || _b === void 0 ? void 0 : _b.sms;
        _this.push = (_c = modelObject) === null || _c === void 0 ? void 0 : _c.push;
        _this.bluetooth = (_d = modelObject) === null || _d === void 0 ? void 0 : _d.bluetooth;
        _this.rfid = (_e = modelObject) === null || _e === void 0 ? void 0 : _e.rfid;
        _this.wifi = (_f = modelObject) === null || _f === void 0 ? void 0 : _f.wifi;
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
