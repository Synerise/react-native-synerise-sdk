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
var UnitPrice_1 = require("./../classes/events/cart/UnitPrice");
exports.UnitPrice = UnitPrice_1.UnitPrice;
var AddedToCartEvent_1 = require("./../classes/events/cart/AddedToCartEvent");
exports.AddedToCartEvent = AddedToCartEvent_1.AddedToCartEvent;
var RemovedFromCartEvent_1 = require("./../classes/events/cart/RemovedFromCartEvent");
exports.RemovedFromCartEvent = RemovedFromCartEvent_1.RemovedFromCartEvent;
// PRODUCT
var ProductViewEvent_1 = require("./../classes/events/product/ProductViewEvent");
exports.ProductViewEvent = ProductViewEvent_1.ProductViewEvent;
// PUSH
var CancelledPushEvent_1 = require("./../classes/events/push/CancelledPushEvent");
exports.CancelledPushEvent = CancelledPushEvent_1.CancelledPushEvent;
var ClickedPushEvent_1 = require("./../classes/events/push/ClickedPushEvent");
exports.ClickedPushEvent = ClickedPushEvent_1.ClickedPushEvent;
var ViewedPushEvent_1 = require("./../classes/events/push/ViewedPushEvent");
exports.ViewedPushEvent = ViewedPushEvent_1.ViewedPushEvent;
// RECOMMENDATION
var RecommendationClickEvent_1 = require("./../classes/events/recommendation/RecommendationClickEvent");
exports.RecommendationClickEvent = RecommendationClickEvent_1.RecommendationClickEvent;
var RecommendationSeenEvent_1 = require("./../classes/events/recommendation/RecommendationSeenEvent");
exports.RecommendationSeenEvent = RecommendationSeenEvent_1.RecommendationSeenEvent;
// OTHER
var AddedToFavouritesEvent_1 = require("./../classes/events/other/AddedToFavouritesEvent");
exports.AddedToFavouritesEvent = AddedToFavouritesEvent_1.AddedToFavouritesEvent;
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
