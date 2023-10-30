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
exports.AppearedInLocationEvent = void 0;
var CustomEvent_1 = require("./../CustomEvent");
var Params;
(function (Params) {
    Params["LAT"] = "lat";
    Params["LON"] = "lon";
})(Params || (Params = {}));
var AppearedInLocationEvent = /** @class */ (function (_super) {
    __extends(AppearedInLocationEvent, _super);
    function AppearedInLocationEvent(label, lat, lon, parameters) {
        var _this = _super.call(this, label, 'client.location', parameters || {}) || this;
        //TODO: walidacja czy nie ma kluczy takich
        _this.parameters[Params.LAT] = lat;
        _this.parameters[Params.LON] = lon;
        return _this;
    }
    return AppearedInLocationEvent;
}(CustomEvent_1.CustomEvent));
exports.AppearedInLocationEvent = AppearedInLocationEvent;
