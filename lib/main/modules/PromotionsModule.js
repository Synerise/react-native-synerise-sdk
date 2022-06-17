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
exports.PromotionsModule = void 0;
var react_native_1 = require("react-native");
var SyneriseModuleConnector_1 = require("./../communication/SyneriseModuleConnector");
var BaseModel_1 = require("./../../classes/models/BaseModel");
var BaseModule_1 = require("./BaseModule");
var PromotionResponse_1 = require("./../../classes/models/Promotions/PromotionResponse");
var Promotion_1 = require("./../../classes/models/Promotions/Promotion");
var AssignVoucherResponse_1 = require("./../../classes/models/Vouchers/AssignVoucherResponse");
var VoucherCodesResponse_1 = require("./../../classes/models/Vouchers/VoucherCodesResponse");
var RNPromotions = react_native_1.NativeModules.RNPromotions;
var PromotionsModule = /** @class */ (function (_super) {
    __extends(PromotionsModule, _super);
    function PromotionsModule() {
        return _super.call(this) || this;
    }
    PromotionsModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new PromotionsModule();
        }
        return this._instance;
    };
    PromotionsModule.prototype.getAllPromotions = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getAllPromotions, [], onSuccess, onError, BaseModel_1.ModelMapper.make(PromotionResponse_1.PromotionResponse));
    };
    PromotionsModule.prototype.getPromotions = function (apiQuery, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getPromotions, [apiQuery], onSuccess, onError, BaseModel_1.ModelMapper.make(PromotionResponse_1.PromotionResponse));
    };
    PromotionsModule.prototype.getPromotionByUUID = function (uuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getPromotionByUUID, [uuid], onSuccess, onError, BaseModel_1.ModelMapper.make(Promotion_1.Promotion));
    };
    PromotionsModule.prototype.getPromotionByCode = function (code, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getPromotionByCode, [code], onSuccess, onError, BaseModel_1.ModelMapper.make(Promotion_1.Promotion));
    };
    PromotionsModule.prototype.activatePromotionByUUID = function (uuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.activatePromotionByUUID, [uuid], onSuccess, onError);
    };
    PromotionsModule.prototype.activatePromotionByCode = function (code, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.activatePromotionByCode, [code], onSuccess, onError);
    };
    PromotionsModule.prototype.deactivatePromotionByUUID = function (uuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.deactivatePromotionByUUID, [uuid], onSuccess, onError);
    };
    PromotionsModule.prototype.deactivatePromotionByCode = function (code, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.deactivatePromotionByCode, [code], onSuccess, onError);
    };
    PromotionsModule.prototype.activatePromotionsBatch = function (promotionsIdentifiers, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.activatePromotionsBatch, [promotionsIdentifiers], onSuccess, onError);
    };
    PromotionsModule.prototype.deactivatePromotionsBatch = function (promotionsIdentifiers, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.deactivatePromotionsBatch, [promotionsIdentifiers], onSuccess, onError);
    };
    PromotionsModule.prototype.getOrAssignVoucher = function (poolUuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getOrAssignVoucher, [poolUuid], onSuccess, onError, BaseModel_1.ModelMapper.make(AssignVoucherResponse_1.AssignVoucherResponse));
    };
    PromotionsModule.prototype.assignVoucherCode = function (poolUuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.assignVoucherCode, [poolUuid], onSuccess, onError, BaseModel_1.ModelMapper.make(AssignVoucherResponse_1.AssignVoucherResponse));
    };
    PromotionsModule.prototype.getAssignedVoucherCodes = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getAssignedVoucherCodes, [], onSuccess, onError, BaseModel_1.ModelMapper.make(VoucherCodesResponse_1.VoucherCodesResponse));
    };
    return PromotionsModule;
}(BaseModule_1.BaseModule));
exports.PromotionsModule = PromotionsModule;
