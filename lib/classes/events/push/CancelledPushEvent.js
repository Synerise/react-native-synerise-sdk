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
var CANCELLED_PUSH_EVENT_TYPE = 'cancelled-push';
var CancelledPushEvent = /** @class */ (function (_super) {
    __extends(CancelledPushEvent, _super);
    function CancelledPushEvent(label, parameters) {
        return _super.call(this, CANCELLED_PUSH_EVENT_TYPE, label, null, parameters || {}) || this;
    }
    return CancelledPushEvent;
}(Event_1.Event));
exports.CancelledPushEvent = CancelledPushEvent;
