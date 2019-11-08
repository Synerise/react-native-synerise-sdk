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
var RecommendationEvent_1 = require("./RecommendationEvent");
var RECOMMENDATION_CLICK_EVENT_TYPE = 'recommendation-click';
var RecommendationClickEvent = /** @class */ (function (_super) {
    __extends(RecommendationClickEvent, _super);
    function RecommendationClickEvent(label, productId, name, campaignId, campaignHash, parameters) {
        return _super.call(this, RECOMMENDATION_CLICK_EVENT_TYPE, label, productId, name, campaignId, campaignHash, parameters || {}) || this;
    }
    return RecommendationClickEvent;
}(RecommendationEvent_1.RecommendationEvent));
exports.RecommendationClickEvent = RecommendationClickEvent;
