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
exports.ClientAccountUpdateContext = void 0;
var BaseModel_1 = require("./../BaseModel");
var ClientAgreements_1 = require("./../Client/ClientAgreements");
var ClientAccountUpdateContext = /** @class */ (function (_super) {
    __extends(ClientAccountUpdateContext, _super);
    function ClientAccountUpdateContext(modelObject) {
        var _this = _super.call(this) || this;
        if (modelObject != undefined) {
            _this.email = modelObject.email;
            _this.phone = modelObject.phone;
            _this.customId = modelObject.customId;
            _this.uuid = modelObject.uuid;
            _this.firstName = modelObject.firstName;
            _this.lastName = modelObject.lastName;
            _this.displayName = modelObject.displayName;
            _this.sex = modelObject.sex;
            _this.birthDate = modelObject.birthDate;
            _this.avatarUrl = modelObject.avatarUrl;
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
            agreements: this.agreements,
            attributes: this.attributes,
        };
    };
    return ClientAccountUpdateContext;
}(BaseModel_1.BaseModel));
exports.ClientAccountUpdateContext = ClientAccountUpdateContext;
