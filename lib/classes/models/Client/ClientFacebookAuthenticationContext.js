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
exports.ClientFacebookAuthenticationContext = void 0;
var BaseModel_1 = require("./../BaseModel");
var ClientAgreements_1 = require("./ClientAgreements");
var ClientFacebookAuthenticationContext = /** @class */ (function (_super) {
    __extends(ClientFacebookAuthenticationContext, _super);
    function ClientFacebookAuthenticationContext(modelObject) {
        var _this = _super.call(this) || this;
        if (modelObject != undefined) {
            _this.authID = modelObject.authID;
            _this.agreements = new ClientAgreements_1.ClientAgreements(modelObject.agreements);
            _this.attributes = modelObject.attributes;
        }
        return _this;
    }
    ClientFacebookAuthenticationContext.prototype.toObject = function () {
        return {
            authID: this.authID,
            agreements: this.agreements,
            attributes: this.attributes,
        };
    };
    return ClientFacebookAuthenticationContext;
}(BaseModel_1.BaseModel));
exports.ClientFacebookAuthenticationContext = ClientFacebookAuthenticationContext;
