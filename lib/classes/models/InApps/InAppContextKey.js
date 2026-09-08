"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InAppContextKey = void 0;
/**
 * Well-known keys of `Synerise.Injector.inAppContext`.
 *
 * `JinjavaContext` is the only part of the context sent to the backend for server-side Jinja
 * evaluation when a campaign is rendered. It may hold a nested object; its size is validated
 * server-side.
 */
var InAppContextKey;
(function (InAppContextKey) {
    InAppContextKey["JinjavaContext"] = "jinjavaContext";
})(InAppContextKey || (InAppContextKey = {}));
exports.InAppContextKey = InAppContextKey;
