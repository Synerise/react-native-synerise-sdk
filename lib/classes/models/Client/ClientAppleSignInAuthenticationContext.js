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
var ClientAgreements_1 = require("./ClientAgreements");
var ClientAppleSignInAuthenticationContext = /** @class */ (function (_super) {
    __extends(ClientAppleSignInAuthenticationContext, _super);
    function ClientAppleSignInAuthenticationContext(modelObject) {
        var _a, _b, _c;
        var _this = _super.call(this) || this;
        _this.authID = (_a = modelObject) === null || _a === void 0 ? void 0 : _a.authID;
        _this.agreements = new ClientAgreements_1.ClientAgreements((_b = modelObject) === null || _b === void 0 ? void 0 : _b.agreements);
        _this.attributes = (_c = modelObject) === null || _c === void 0 ? void 0 : _c.attributes;
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
