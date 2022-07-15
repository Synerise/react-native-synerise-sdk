"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event(type, label, action, parameters) {
        this.type = type;
        this.label = label;
        this.action = action;
        this.parameters = parameters;
    }
    Event.prototype.toObject = function () {
        return {
            type: this.type,
            label: this.label,
            action: this.action,
            parameters: this.parameters,
        };
    };
    return Event;
}());
exports.Event = Event;
