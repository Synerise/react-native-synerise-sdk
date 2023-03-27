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
exports.ClientAccountUpdateContext = void 0;
var BaseModel_1 = require("./../BaseModel");
var ClientAgreements_1 = require("./../Client/ClientAgreements");
var ClientAccountUpdateContext = /** @class */ (function (_super) {
    __extends(ClientAccountUpdateContext, _super);
    function ClientAccountUpdateContext(modelObject) {
        var _this = _super.call(this) || this;
        _this.email = modelObject === null || modelObject === void 0 ? void 0 : modelObject.email;
        _this.phone = modelObject === null || modelObject === void 0 ? void 0 : modelObject.phone;
        _this.customId = modelObject === null || modelObject === void 0 ? void 0 : modelObject.customId;
        _this.uuid = modelObject === null || modelObject === void 0 ? void 0 : modelObject.uuid;
        _this.firstName = modelObject === null || modelObject === void 0 ? void 0 : modelObject.firstName;
        _this.lastName = modelObject === null || modelObject === void 0 ? void 0 : modelObject.lastName;
        _this.displayName = modelObject === null || modelObject === void 0 ? void 0 : modelObject.displayName;
        _this.sex = modelObject === null || modelObject === void 0 ? void 0 : modelObject.sex;
        _this.birthDate = modelObject === null || modelObject === void 0 ? void 0 : modelObject.birthDate;
        _this.avatarUrl = modelObject === null || modelObject === void 0 ? void 0 : modelObject.avatarUrl;
        _this.company = modelObject === null || modelObject === void 0 ? void 0 : modelObject.company;
        _this.address = modelObject === null || modelObject === void 0 ? void 0 : modelObject.address;
        _this.province = modelObject === null || modelObject === void 0 ? void 0 : modelObject.province;
        _this.zipCode = modelObject === null || modelObject === void 0 ? void 0 : modelObject.zipCode;
        _this.countryCode = modelObject === null || modelObject === void 0 ? void 0 : modelObject.countryCode;
        _this.agreements = new ClientAgreements_1.ClientAgreements(modelObject === null || modelObject === void 0 ? void 0 : modelObject.agreements);
        _this.attributes = modelObject === null || modelObject === void 0 ? void 0 : modelObject.attributes;
        return _this;
    }
    ClientAccountUpdateContext.prototype.toObject = function () {
        return {
            email: this.email,
            phone: this.phone,
            customId: this.customId,
            uuid: this.uuid,
            firstName: this.firstName,
            lastName: this.lastName,
            displayName: this.displayName,
            sex: this.sex,
            birthDate: this.birthDate,
            avatarUrl: this.avatarUrl,
            company: this.company,
            address: this.address,
            city: this.city,
            province: this.province,
            zipCode: this.zipCode,
            countryCode: this.countryCode,
            agreements: this.agreements.toObjectIfNotEmpty(),
            attributes: this.attributes,
        };
    };
    return ClientAccountUpdateContext;
}(BaseModel_1.BaseModel));
exports.ClientAccountUpdateContext = ClientAccountUpdateContext;
