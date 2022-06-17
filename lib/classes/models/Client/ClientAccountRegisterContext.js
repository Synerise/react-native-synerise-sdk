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
exports.ClientAccountRegisterContext = void 0;
var BaseModel_1 = require("./../BaseModel");
var ClientAgreements_1 = require("./../Client/ClientAgreements");
var ClientAccountRegisterContext = /** @class */ (function (_super) {
    __extends(ClientAccountRegisterContext, _super);
    function ClientAccountRegisterContext(email, password, modelObject) {
        var _this = _super.call(this) || this;
        _this.email = email;
        _this.password = password;
        if (modelObject != undefined) {
            _this.phone = modelObject.phone;
            _this.customId = modelObject.customId;
            _this.firstName = modelObject.firstName;
            _this.lastName = modelObject.lastName;
            _this.sex = modelObject.sex;
            _this.company = modelObject.company;
            _this.address = modelObject.address;
            _this.province = modelObject.province;
            _this.zipCode = modelObject.zipCode;
            _this.countryCode = modelObject.countryCode;
            _this.agreements = new ClientAgreements_1.ClientAgreements(modelObject.agreements);
            _this.attributes = modelObject.attributes;
        }
        return _this;
    }
    ClientAccountRegisterContext.prototype.toObject = function () {
        return {
            email: this.email,
            password: this.password,
            phone: this.phone,
            customId: this.customId,
            firstName: this.firstName,
            lastName: this.lastName,
            sex: this.sex,
            company: this.company,
            address: this.address,
            city: this.city,
            province: this.province,
            zipCode: this.zipCode,
            countryCode: this.countryCode,
            agreements: this.agreements,
            attributes: this.attributes,
        };
    };
    return ClientAccountRegisterContext;
}(BaseModel_1.BaseModel));
exports.ClientAccountRegisterContext = ClientAccountRegisterContext;
