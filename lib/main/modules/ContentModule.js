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
exports.ContentModule = void 0;
var react_native_1 = require("react-native");
var SyneriseModuleConnector_1 = require("../communication/SyneriseModuleConnector");
var BaseModule_1 = require("./BaseModule");
var BaseModel_1 = require("../../classes/models/BaseModel");
var RecommendationResponse_1 = require("../../classes/models/Content/RecommendationResponse");
var import_models_1 = require("../../config/import_models");
var RNContent = react_native_1.NativeModules.RNContent;
var ContentModule = /** @class */ (function (_super) {
    __extends(ContentModule, _super);
    function ContentModule() {
        return _super.call(this) || this;
    }
    ContentModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new ContentModule();
        }
        return this._instance;
    };
    /**
     * This method gets the document that is defined for the provided slug.
     *
     * @param slug Identifies a specific document
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    ContentModule.prototype.getDocument = function (slug, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNContent.getDocument, [slug], onSuccess, onError);
    };
    /**
     * This method gets documents that are defined for parameters provided in the query object.
     *
     * @param apiQuery `DocumentsApiQuery` object responsible for storing all query parameters
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    ContentModule.prototype.getDocuments = function (apiQuery, onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNContent.getDocuments, [apiQuery], onSuccess, onError);
    };
    /**
     * This method gets recommendations that are defined for the options provided.
     *
     * @param options `RecommendationOptions` object providing parameters for recommendations
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    ContentModule.prototype.getRecommendations = function (options, onSuccess, onError) {
        var optionsObject = options.toObject();
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNContent.getRecommendations, [optionsObject], onSuccess, onError, BaseModel_1.ModelMapper.make(RecommendationResponse_1.RecommendationResponse));
    };
    /**
     * This method gets customer's highest-priority screen view campaign.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    ContentModule.prototype.getScreenView = function (onSuccess, onError) {
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNContent.getScreenView, [], onSuccess, onError, BaseModel_1.ModelMapper.make(import_models_1.ScreenViewResponse));
    };
    return ContentModule;
}(BaseModule_1.BaseModule));
exports.ContentModule = ContentModule;
