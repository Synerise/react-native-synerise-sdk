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
var Event_1 = require("./../Event");
var RECOGNIZE_CLIENT_EVENT_TYPE = 'custom';
var RECOGNIZE_CLIENT_EVENT_LABEL = 'client';
var RECOGNIZE_CLIENT_EVENT_ACTION = 'client.createOrUpdate';
var RecognizeClientEvent = /** @class */ (function (_super) {
    __extends(RecognizeClientEvent, _super);
    function RecognizeClientEvent(parameters) {
        return _super.call(this, RECOGNIZE_CLIENT_EVENT_TYPE, RECOGNIZE_CLIENT_EVENT_LABEL, RECOGNIZE_CLIENT_EVENT_ACTION, parameters || {}) || this;
    }
    return RecognizeClientEvent;
}(Event_1.Event));
exports.RecognizeClientEvent = RecognizeClientEvent;
