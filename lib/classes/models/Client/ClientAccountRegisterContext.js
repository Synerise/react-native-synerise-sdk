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
var ClientAccountRegisterContext = /** @class */ (function (_super) {
    __extends(ClientAccountRegisterContext, _super);
    function ClientAccountRegisterContext(email, password, modelObject) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        var _this = _super.call(this) || this;
        _this.email = email;
        _this.password = password;
        _this.phone = (_a = modelObject) === null || _a === void 0 ? void 0 : _a.phone;
        _this.customId = (_b = modelObject) === null || _b === void 0 ? void 0 : _b.customId;
        _this.firstName = (_c = modelObject) === null || _c === void 0 ? void 0 : _c.firstName;
        _this.lastName = (_d = modelObject) === null || _d === void 0 ? void 0 : _d.lastName;
        _this.sex = (_e = modelObject) === null || _e === void 0 ? void 0 : _e.sex;
        _this.company = (_f = modelObject) === null || _f === void 0 ? void 0 : _f.company;
        _this.address = (_g = modelObject) === null || _g === void 0 ? void 0 : _g.address;
        _this.province = (_h = modelObject) === null || _h === void 0 ? void 0 : _h.province;
        _this.zipCode = (_j = modelObject) === null || _j === void 0 ? void 0 : _j.zipCode;
        _this.countryCode = (_k = modelObject) === null || _k === void 0 ? void 0 : _k.countryCode;
        _this.agreements = new ClientAgreements_1.ClientAgreements((_l = modelObject) === null || _l === void 0 ? void 0 : _l.agreements);
        _this.attributes = (_m = modelObject) === null || _m === void 0 ? void 0 : _m.attributes;
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
            agreements: this.agreements.toObjectIfNotEmpty(),
            attributes: this.attributes,
        };
    };
    return ClientAccountRegisterContext;
}(BaseModel_1.BaseModel));
exports.ClientAccountRegisterContext = ClientAccountRegisterContext;
