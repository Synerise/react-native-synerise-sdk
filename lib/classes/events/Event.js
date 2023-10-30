"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Event = void 0;
var Event = /** @class */ (function () {
    function Event(label, action, parameters) {
        this.label = label;
        this.action = action;
        this.parameters = parameters;
    }
    Event.prototype.toObject = function () {
        return {
            label: this.label,
            action: this.action,
            parameters: this.parameters,
        };
    };
    return Event;
}());
exports.Event = Event;
