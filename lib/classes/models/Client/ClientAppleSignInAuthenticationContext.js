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
exports.ClientAppleSignInAuthenticationContext = void 0;
var BaseModel_1 = require("./../BaseModel");
var ClientAgreements_1 = require("./ClientAgreements");
var ClientAppleSignInAuthenticationContext = /** @class */ (function (_super) {
    __extends(ClientAppleSignInAuthenticationContext, _super);
    function ClientAppleSignInAuthenticationContext(modelObject) {
        var _this = _super.call(this) || this;
        _this.authID = modelObject === null || modelObject === void 0 ? void 0 : modelObject.authID;
        _this.agreements = new ClientAgreements_1.ClientAgreements(modelObject === null || modelObject === void 0 ? void 0 : modelObject.agreements);
        _this.attributes = modelObject === null || modelObject === void 0 ? void 0 : modelObject.attributes;
        return _this;
    }
    ClientAppleSignInAuthenticationContext.prototype.toObject = function () {
        return {
            authID: this.authID,
            agreements: this.agreements.toObjectIfNotEmpty(),
            attributes: this.attributes,
        };
    };
    return ClientAppleSignInAuthenticationContext;
}(BaseModel_1.BaseModel));
exports.ClientAppleSignInAuthenticationContext = ClientAppleSignInAuthenticationContext;
