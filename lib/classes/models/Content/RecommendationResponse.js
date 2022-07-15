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
var Recommendation_1 = require("./Recommendation");
var RecommendationResponse = /** @class */ (function (_super) {
    __extends(RecommendationResponse, _super);
    function RecommendationResponse(modelObject) {
        var _this = _super.call(this, modelObject) || this;
        _this.campaignHash = modelObject.campaignHash;
        _this.campaignId = modelObject.campaignId;
        _this.schema = modelObject.schema;
        _this.slug = modelObject.slug;
        _this.uuid = modelObject.uuid;
        _this.items = new Array();
        if (modelObject.items instanceof Array) {
            var i = 0;
            for (i = 0; i < modelObject.items.length; i++) {
                var recommendation = new Recommendation_1.Recommendation(modelObject.items[i]);
                _this.items.push(recommendation);
            }
        }
        return _this;
    }
    return RecommendationResponse;
}(BaseModel_1.BaseModel));
exports.RecommendationResponse = RecommendationResponse;
