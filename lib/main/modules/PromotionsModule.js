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
    /**
     * This method retrieves all available promotions that are defined for a customer.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.getAllPromotions = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getAllPromotions, [], onSuccess, onError, BaseModel_1.ModelMapper.make(PromotionResponse_1.PromotionResponse));
    };
    /**
     * This method retrieves promotions that match the parameters defined in the query object.
     *
     * @param apiQuery `PromotionsApiQuery` object responsible for storing all query parameters
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.getPromotions = function (apiQuery, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getPromotions, [apiQuery], onSuccess, onError, BaseModel_1.ModelMapper.make(PromotionResponse_1.PromotionResponse));
    };
    /**
     * This method retrieves the promotion with the specified UUID.
     *
     * @param uuid UUID of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.getPromotionByUUID = function (uuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getPromotionByUUID, [uuid], onSuccess, onError, BaseModel_1.ModelMapper.make(Promotion_1.Promotion));
    };
    /**
     * This method retrieves the promotion with the specified code.
     *
     * @param code Code of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.getPromotionByCode = function (code, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getPromotionByCode, [code], onSuccess, onError, BaseModel_1.ModelMapper.make(Promotion_1.Promotion));
    };
    /**
     * This method activates the promotion with the specified UUID.
     *
     * @param uuid UUID of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.activatePromotionByUUID = function (uuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.activatePromotionByUUID, [uuid], onSuccess, onError);
    };
    /**
     * This method activates the promotion with the specified code.
     *
     * @param code Code of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.activatePromotionByCode = function (code, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.activatePromotionByCode, [code], onSuccess, onError);
    };
    /**
     * This method deactivates the promotion with the specified UUID.
     *
     * @param uuid UUID of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.deactivatePromotionByUUID = function (uuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.deactivatePromotionByUUID, [uuid], onSuccess, onError);
    };
    /**
     * This method deactivates the promotion with the specified code.
     *
     * @param code Code of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.deactivatePromotionByCode = function (code, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.deactivatePromotionByCode, [code], onSuccess, onError);
    };
    /**
     * This method activates promotions with a code or with UUID in a batch.
     *
     * @param promotionsIdentifiers List of promotion identifiers
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.activatePromotionsBatch = function (promotionsIdentifiers, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.activatePromotionsBatch, [promotionsIdentifiers], onSuccess, onError);
    };
    /**
     * This method deactivates promotions with a code or with UUID in a batch.
     *
     * @param promotionsIdentifiers List of promotion identifiers
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.deactivatePromotionsBatch = function (promotionsIdentifiers, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.deactivatePromotionsBatch, [promotionsIdentifiers], onSuccess, onError);
    };
    /**
     * This method retrieves an assigned voucher code or assigns a voucher from a pool identified by UUID to the customer.
     *
     * @param poolUuid Pool’s universally unique identifier
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.getOrAssignVoucher = function (poolUuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getOrAssignVoucher, [poolUuid], onSuccess, onError, BaseModel_1.ModelMapper.make(AssignVoucherResponse_1.AssignVoucherResponse));
    };
    /**
     * This method assigns a voucher from a pool identified by UUID to the customer.
     *
     * @param poolUuid Pool’s universally unique identifier
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.assignVoucherCode = function (poolUuid, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.assignVoucherCode, [poolUuid], onSuccess, onError, BaseModel_1.ModelMapper.make(AssignVoucherResponse_1.AssignVoucherResponse));
    };
    /**
     * This method retrieves voucher codes for a customer.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    PromotionsModule.prototype.getAssignedVoucherCodes = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNPromotions.getAssignedVoucherCodes, [], onSuccess, onError, BaseModel_1.ModelMapper.make(VoucherCodesResponse_1.VoucherCodesResponse));
    };
    return PromotionsModule;
}(BaseModule_1.BaseModule));
exports.PromotionsModule = PromotionsModule;
