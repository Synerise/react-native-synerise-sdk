"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("./../classes/events/Event");
exports.Event = Event_1.Event;
var CustomEvent_1 = require("./../classes/events/CustomEvent");
exports.CustomEvent = CustomEvent_1.CustomEvent;
// AUTH
var LoggedInEvent_1 = require("./../classes/events/auth/LoggedInEvent");
exports.LoggedInEvent = LoggedInEvent_1.LoggedInEvent;
var LoggedOutEvent_1 = require("./../classes/events/auth/LoggedOutEvent");
exports.LoggedOutEvent = LoggedOutEvent_1.LoggedOutEvent;
var RecognizeClientEvent_1 = require("./../classes/events/auth/RecognizeClientEvent");
exports.RecognizeClientEvent = RecognizeClientEvent_1.RecognizeClientEvent;
var RegisteredEvent_1 = require("./../classes/events/auth/RegisteredEvent");
exports.RegisteredEvent = RegisteredEvent_1.RegisteredEvent;
// CART
var UnitPrice_1 = require("../classes/events/cart/UnitPrice");
exports.UnitPrice = UnitPrice_1.UnitPrice;
var ProductAddedToCartEvent_1 = require("../classes/events/cart/ProductAddedToCartEvent");
exports.ProductAddedToCartEvent = ProductAddedToCartEvent_1.ProductAddedToCartEvent;
var ProductRemovedFromCartEvent_1 = require("../classes/events/cart/ProductRemovedFromCartEvent");
exports.ProductRemovedFromCartEvent = ProductRemovedFromCartEvent_1.ProductRemovedFromCartEvent;
// PRODUCT
var ProductViewedEvent_1 = require("../classes/events/product/ProductViewedEvent");
exports.ProductViewedEvent = ProductViewedEvent_1.ProductViewedEvent;
// PUSH
var PushCancelledEvent_1 = require("../classes/events/push/PushCancelledEvent");
exports.PushCancelledEvent = PushCancelledEvent_1.PushCancelledEvent;
var PushClickedEvent_1 = require("../classes/events/push/PushClickedEvent");
exports.PushClickedEvent = PushClickedEvent_1.PushClickedEvent;
var PushViewedEvent_1 = require("../classes/events/push/PushViewedEvent");
exports.PushViewedEvent = PushViewedEvent_1.PushViewedEvent;
// RECOMMENDATION
var RecommendationClickEvent_1 = require("./../classes/events/recommendation/RecommendationClickEvent");
exports.RecommendationClickEvent = RecommendationClickEvent_1.RecommendationClickEvent;
var RecommendationSeenEvent_1 = require("./../classes/events/recommendation/RecommendationSeenEvent");
exports.RecommendationSeenEvent = RecommendationSeenEvent_1.RecommendationSeenEvent;
// OTHER
var ProductAddedToFavouritesEvent_1 = require("../classes/events/product/ProductAddedToFavouritesEvent");
exports.ProductAddedToFavouritesEvent = ProductAddedToFavouritesEvent_1.ProductAddedToFavouritesEvent;
var AppearedInLocationEvent_1 = require("./../classes/events/other/AppearedInLocationEvent");
exports.AppearedInLocationEvent = AppearedInLocationEvent_1.AppearedInLocationEvent;
var HitTimerEvent_1 = require("./../classes/events/other/HitTimerEvent");
exports.HitTimerEvent = HitTimerEvent_1.HitTimerEvent;
var SearchedEvent_1 = require("./../classes/events/other/SearchedEvent");
exports.SearchedEvent = SearchedEvent_1.SearchedEvent;
var SharedEvent_1 = require("./../classes/events/other/SharedEvent");
exports.SharedEvent = SharedEvent_1.SharedEvent;
var VisitedScreenEvent_1 = require("./../classes/events/other/VisitedScreenEvent");
exports.VisitedScreenEvent = VisitedScreenEvent_1.VisitedScreenEvent;
