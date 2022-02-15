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
exports.PushCancelledEvent = void 0;
var Event_1 = require("../Event");
var PUSH_CANCELLED_EVENT_TYPE = 'cancelled-push';
var PushCancelledEvent = /** @class */ (function (_super) {
    __extends(PushCancelledEvent, _super);
    function PushCancelledEvent(label, parameters) {
        return _super.call(this, PUSH_CANCELLED_EVENT_TYPE, label, null, parameters || {}) || this;
    }
    return PushCancelledEvent;
}(Event_1.Event));
exports.PushCancelledEvent = PushCancelledEvent;
