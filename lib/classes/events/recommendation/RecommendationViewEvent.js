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
exports.RecommendationViewEvent = void 0;
var RecommendationEvent_1 = require("./RecommendationEvent");
var Params;
(function (Params) {
    Params["ITEMS"] = "items";
    Params["CATEGORY"] = "category";
    Params["URL"] = "url";
    Params["CAMPAIGN_ID"] = "campaignId";
    Params["CAMPAIGN_HASH"] = "campaignHash";
    Params["CORRELATION_ID"] = "correlationId";
})(Params || (Params = {}));
var RecommendationViewEvent = /** @class */ (function (_super) {
    __extends(RecommendationViewEvent, _super);
    function RecommendationViewEvent(label, items, campaignId, campaignHash, correlationId, parameters) {
        var _this = _super.call(this, label, 'recommendation.view', parameters || {}) || this;
        if (items !== undefined && items != null) {
            _this.parameters[Params.ITEMS] = items;
        }
        _this.parameters[Params.CAMPAIGN_ID] = campaignId;
        _this.parameters[Params.CAMPAIGN_HASH] = campaignHash;
        _this.parameters[Params.CORRELATION_ID] = correlationId;
        return _this;
    }
    RecommendationViewEvent.prototype.setItems = function (items) {
        this.parameters[Params.ITEMS] = items;
    };
    return RecommendationViewEvent;
}(RecommendationEvent_1.RecommendationEvent));
exports.RecommendationViewEvent = RecommendationViewEvent;
