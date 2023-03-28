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
exports.RecommendationEvent = void 0;
var CustomEvent_1 = require("../CustomEvent");
var Params;
(function (Params) {
    Params["PRODUCT_ID"] = "productId";
    Params["NAME"] = "name";
    Params["CATEGORY"] = "category";
    Params["URL"] = "url";
    Params["CAMPAIGN_ID"] = "campaignId";
    Params["CAMPAIGN_HASH"] = "campaignHash";
})(Params || (Params = {}));
var RecommendationEvent = /** @class */ (function (_super) {
    __extends(RecommendationEvent, _super);
    function RecommendationEvent(label, action, productId, name, campaignId, campaignHash, parameters) {
        var _this = _super.call(this, label, action, parameters || {}) || this;
        _this.parameters[Params.PRODUCT_ID] = productId;
        _this.parameters[Params.NAME] = name;
        _this.parameters[Params.CAMPAIGN_ID] = campaignId;
        _this.parameters[Params.CAMPAIGN_HASH] = campaignHash;
        return _this;
    }
    RecommendationEvent.prototype.setCategory = function (category) {
        this.parameters[Params.CATEGORY] = category;
    };
    RecommendationEvent.prototype.setUrl = function (url) {
        this.parameters[Params.URL] = url;
    };
    return RecommendationEvent;
}(CustomEvent_1.CustomEvent));
exports.RecommendationEvent = RecommendationEvent;
