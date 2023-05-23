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
        if (modelObject.phone !== undefined && modelObject.phone !== null) {
            _this.phone = modelObject.phone;
        }
        if (modelObject.customId !== undefined && modelObject.customId !== null) {
            _this.customId = modelObject.customId;
        }
        _this.uuid = modelObject.uuid;
        if (modelObject.firstName !== undefined && modelObject.firstName !== null) {
            _this.firstName = modelObject.firstName;
        }
        if (modelObject.lastName !== undefined && modelObject.lastName !== null) {
            _this.lastName = modelObject.lastName;
        }
        if (modelObject.displayName !== undefined && modelObject.displayName !== null) {
            _this.displayName = modelObject.displayName;
        }
        _this.sex = ClientSex_1.ClientSexFromString(modelObject.sex);
        if (modelObject.birthDate !== undefined && modelObject.birthDate !== null) {
            _this.birthDate = modelObject.birthDate;
        }
        if (modelObject.avatarUrl !== undefined && modelObject.avatarUrl !== null) {
            _this.avatarUrl = modelObject.avatarUrl;
        }
        if (modelObject.company !== undefined && modelObject.company !== null) {
            _this.company = modelObject.company;
        }
        if (modelObject.address !== undefined && modelObject.address !== null) {
            _this.address = modelObject.address;
        }
        if (modelObject.city !== undefined && modelObject.city !== null) {
            _this.city = modelObject.city;
        }
        if (modelObject.province !== undefined && modelObject.province !== null) {
            _this.province = modelObject.province;
        }
        if (modelObject.zipCode !== undefined && modelObject.zipCode !== null) {
            _this.zipCode = modelObject.zipCode;
        }
        if (modelObject.countryCode !== undefined && modelObject.countryCode !== null) {
            _this.countryCode = modelObject.countryCode;
        }
        _this.anonymous = modelObject.anonymous;
        _this.lastActivityDate = new Date(modelObject.lastActivityDate * 1000);
        if (modelObject.agreements !== undefined && modelObject.agreements !== null) {
            _this.agreements = new ClientAgreements_1.ClientAgreements(modelObject.agreements);
        }
        if (modelObject.attributes !== undefined && modelObject.attributes !== null) {
            _this.attributes = modelObject.attributes;
        }
        if (modelObject.tags !== undefined && modelObject.tags !== null) {
            _this.tags = modelObject.tags;
        }
        return _this;
    }
    return ClientAccountInformation;
}(BaseModel_1.BaseModel));
exports.ClientAccountInformation = ClientAccountInformation;
