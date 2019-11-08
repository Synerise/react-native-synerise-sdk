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
var Event_1 = require("../Event");
var CLICKED_PUSH_EVENT_TYPE = 'clicked-push';
var ClickedPushEvent = /** @class */ (function (_super) {
    __extends(ClickedPushEvent, _super);
    function ClickedPushEvent(label, parameters) {
        return _super.call(this, CLICKED_PUSH_EVENT_TYPE, label, null, parameters || {}) || this;
    }
    return ClickedPushEvent;
}(Event_1.Event));
exports.ClickedPushEvent = ClickedPushEvent;
