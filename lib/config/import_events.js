"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VisitedScreenEvent = exports.SharedEvent = exports.SearchedEvent = exports.HitTimerEvent = exports.AppearedInLocationEvent = exports.ProductAddedToFavouritesEvent = exports.RecommendationSeenEvent = exports.RecommendationClickEvent = exports.PushViewedEvent = exports.PushClickedEvent = exports.PushCancelledEvent = exports.ProductViewedEvent = exports.ProductRemovedFromCartEvent = exports.ProductAddedToCartEvent = exports.UnitPrice = exports.RegisteredEvent = exports.RecognizeClientEvent = exports.LoggedOutEvent = exports.LoggedInEvent = exports.CustomEvent = exports.Event = void 0;
var Event_1 = require("./../classes/events/Event");
Object.defineProperty(exports, "Event", { enumerable: true, get: function () { return Event_1.Event; } });
var CustomEvent_1 = require("./../classes/events/CustomEvent");
Object.defineProperty(exports, "CustomEvent", { enumerable: true, get: function () { return CustomEvent_1.CustomEvent; } });
// AUTH
var LoggedInEvent_1 = require("./../classes/events/auth/LoggedInEvent");
Object.defineProperty(exports, "LoggedInEvent", { enumerable: true, get: function () { return LoggedInEvent_1.LoggedInEvent; } });
var LoggedOutEvent_1 = require("./../classes/events/auth/LoggedOutEvent");
Object.defineProperty(exports, "LoggedOutEvent", { enumerable: true, get: function () { return LoggedOutEvent_1.LoggedOutEvent; } });
var RecognizeClientEvent_1 = require("./../classes/events/auth/RecognizeClientEvent");
Object.defineProperty(exports, "RecognizeClientEvent", { enumerable: true, get: function () { return RecognizeClientEvent_1.RecognizeClientEvent; } });
var RegisteredEvent_1 = require("./../classes/events/auth/RegisteredEvent");
Object.defineProperty(exports, "RegisteredEvent", { enumerable: true, get: function () { return RegisteredEvent_1.RegisteredEvent; } });
// CART
var UnitPrice_1 = require("../classes/events/cart/UnitPrice");
Object.defineProperty(exports, "UnitPrice", { enumerable: true, get: function () { return UnitPrice_1.UnitPrice; } });
var ProductAddedToCartEvent_1 = require("../classes/events/cart/ProductAddedToCartEvent");
Object.defineProperty(exports, "ProductAddedToCartEvent", { enumerable: true, get: function () { return ProductAddedToCartEvent_1.ProductAddedToCartEvent; } });
var ProductRemovedFromCartEvent_1 = require("../classes/events/cart/ProductRemovedFromCartEvent");
Object.defineProperty(exports, "ProductRemovedFromCartEvent", { enumerable: true, get: function () { return ProductRemovedFromCartEvent_1.ProductRemovedFromCartEvent; } });
// PRODUCT
var ProductViewedEvent_1 = require("../classes/events/product/ProductViewedEvent");
Object.defineProperty(exports, "ProductViewedEvent", { enumerable: true, get: function () { return ProductViewedEvent_1.ProductViewedEvent; } });
// PUSH
var PushCancelledEvent_1 = require("../classes/events/push/PushCancelledEvent");
Object.defineProperty(exports, "PushCancelledEvent", { enumerable: true, get: function () { return PushCancelledEvent_1.PushCancelledEvent; } });
var PushClickedEvent_1 = require("../classes/events/push/PushClickedEvent");
Object.defineProperty(exports, "PushClickedEvent", { enumerable: true, get: function () { return PushClickedEvent_1.PushClickedEvent; } });
var PushViewedEvent_1 = require("../classes/events/push/PushViewedEvent");
Object.defineProperty(exports, "PushViewedEvent", { enumerable: true, get: function () { return PushViewedEvent_1.PushViewedEvent; } });
// RECOMMENDATION
var RecommendationClickEvent_1 = require("./../classes/events/recommendation/RecommendationClickEvent");
Object.defineProperty(exports, "RecommendationClickEvent", { enumerable: true, get: function () { return RecommendationClickEvent_1.RecommendationClickEvent; } });
var RecommendationSeenEvent_1 = require("./../classes/events/recommendation/RecommendationSeenEvent");
Object.defineProperty(exports, "RecommendationSeenEvent", { enumerable: true, get: function () { return RecommendationSeenEvent_1.RecommendationSeenEvent; } });
// OTHER
var ProductAddedToFavouritesEvent_1 = require("../classes/events/product/ProductAddedToFavouritesEvent");
Object.defineProperty(exports, "ProductAddedToFavouritesEvent", { enumerable: true, get: function () { return ProductAddedToFavouritesEvent_1.ProductAddedToFavouritesEvent; } });
var AppearedInLocationEvent_1 = require("./../classes/events/other/AppearedInLocationEvent");
Object.defineProperty(exports, "AppearedInLocationEvent", { enumerable: true, get: function () { return AppearedInLocationEvent_1.AppearedInLocationEvent; } });
var HitTimerEvent_1 = require("./../classes/events/other/HitTimerEvent");
Object.defineProperty(exports, "HitTimerEvent", { enumerable: true, get: function () { return HitTimerEvent_1.HitTimerEvent; } });
var SearchedEvent_1 = require("./../classes/events/other/SearchedEvent");
Object.defineProperty(exports, "SearchedEvent", { enumerable: true, get: function () { return SearchedEvent_1.SearchedEvent; } });
var SharedEvent_1 = require("./../classes/events/other/SharedEvent");
Object.defineProperty(exports, "SharedEvent", { enumerable: true, get: function () { return SharedEvent_1.SharedEvent; } });
var VisitedScreenEvent_1 = require("./../classes/events/other/VisitedScreenEvent");
Object.defineProperty(exports, "VisitedScreenEvent", { enumerable: true, get: function () { return VisitedScreenEvent_1.VisitedScreenEvent; } });
