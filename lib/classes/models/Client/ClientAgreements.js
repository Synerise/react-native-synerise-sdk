"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
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
        _this.email = false;
        _this.sms = false;
        _this.push = false;
        _this.bluetooth = false;
        _this.rfid = false;
        _this.wifi = false;
        if (modelObject != undefined) {
            _this.email = modelObject.email || false;
            _this.sms = modelObject.sms || false;
            _this.push = modelObject.push || false;
            _this.bluetooth = modelObject.bluetooth || false;
            _this.rfid = modelObject.rfid || false;
            _this.wifi = modelObject.wifi || false;
        }
        return _this;
    }
    return ClientAgreements;
}(BaseModel_1.BaseModel));
exports.ClientAgreements = ClientAgreements;
