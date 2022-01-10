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
var ClientSex_1 = require("./../Client/ClientSex");
var ClientAgreements_1 = require("./../Client/ClientAgreements");
var ClientAccountInformation = /** @class */ (function (_super) {
    __extends(ClientAccountInformation, _super);
    function ClientAccountInformation(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.clientId = modelObject.clientId;
        _this.email = modelObject.email;
        _this.phone = modelObject.phone;
        _this.customId = modelObject.customId;
        _this.uuid = modelObject.uuid;
        _this.firstName = modelObject.firstName;
        _this.lastName = modelObject.lastName;
        _this.displayName = modelObject.displayName;
        _this.sex = ClientSex_1.ClientSexFromString(modelObject.sex);
        _this.birthDate = modelObject.birthDate;
        _this.avatarUrl = modelObject.avatarUrl;
        _this.company = modelObject.company;
        _this.address = modelObject.address;
        _this.city = modelObject.city;
        _this.province = modelObject.province;
        _this.zipCode = modelObject.zipCode;
        _this.countryCode = modelObject.countryCode;
        _this.anonymous = modelObject.anonymous;
        _this.lastActivityDate = new Date(modelObject.lastActivityDate * 1000);
        _this.agreements = new ClientAgreements_1.ClientAgreements(modelObject.agreements);
        _this.attributes = modelObject.attributes;
        _this.tags = modelObject.tags;
        return _this;
    }
    return ClientAccountInformation;
}(BaseModel_1.BaseModel));
exports.ClientAccountInformation = ClientAccountInformation;
