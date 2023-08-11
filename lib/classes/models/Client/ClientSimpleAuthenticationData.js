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
var ClientAgreements_1 = require("./../Client/ClientAgreements");
var ClientSimpleAuthenticationData = /** @class */ (function (_super) {
    __extends(ClientSimpleAuthenticationData, _super);
    function ClientSimpleAuthenticationData(modelObject) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
        var _this = _super.call(this) || this;
        _this.email = (_a = modelObject) === null || _a === void 0 ? void 0 : _a.email;
        _this.phone = (_b = modelObject) === null || _b === void 0 ? void 0 : _b.phone;
        _this.customId = (_c = modelObject) === null || _c === void 0 ? void 0 : _c.customId;
        _this.uuid = (_d = modelObject) === null || _d === void 0 ? void 0 : _d.uuid;
        _this.firstName = (_e = modelObject) === null || _e === void 0 ? void 0 : _e.firstName;
        _this.lastName = (_f = modelObject) === null || _f === void 0 ? void 0 : _f.lastName;
        _this.displayName = (_g = modelObject) === null || _g === void 0 ? void 0 : _g.displayName;
        _this.sex = (_h = modelObject) === null || _h === void 0 ? void 0 : _h.sex;
        _this.birthDate = (_j = modelObject) === null || _j === void 0 ? void 0 : _j.birthDate;
        _this.avatarUrl = (_k = modelObject) === null || _k === void 0 ? void 0 : _k.avatarUrl;
        _this.company = (_l = modelObject) === null || _l === void 0 ? void 0 : _l.company;
        _this.address = (_m = modelObject) === null || _m === void 0 ? void 0 : _m.address;
        _this.province = (_o = modelObject) === null || _o === void 0 ? void 0 : _o.province;
        _this.zipCode = (_p = modelObject) === null || _p === void 0 ? void 0 : _p.zipCode;
        _this.countryCode = (_q = modelObject) === null || _q === void 0 ? void 0 : _q.countryCode;
        _this.agreements = new ClientAgreements_1.ClientAgreements((_r = modelObject) === null || _r === void 0 ? void 0 : _r.agreements);
        _this.attributes = (_s = modelObject) === null || _s === void 0 ? void 0 : _s.attributes;
        return _this;
    }
    ClientSimpleAuthenticationData.prototype.toObject = function () {
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
    return ClientSimpleAuthenticationData;
}(BaseModel_1.BaseModel));
exports.ClientSimpleAuthenticationData = ClientSimpleAuthenticationData;
