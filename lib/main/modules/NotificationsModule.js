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
exports.NotificationsModule = void 0;
var react_native_1 = require("react-native");
var BaseModule_1 = require("./BaseModule");
var SyneriseModuleConnector_1 = require("./../communication/SyneriseModuleConnector");
var SyneriseModuleEmitter_1 = require("./../communication/SyneriseModuleEmitter");
var DeviceUtils_1 = require("./../../classes/utils/DeviceUtils");
var RNNotifications = react_native_1.NativeModules.RNNotifications;
var NotificationsModule = /** @class */ (function (_super) {
    __extends(NotificationsModule, _super);
    function NotificationsModule() {
        var _this = _super.call(this) || this;
        _this.onRegistrationToken = function (event) {
            if (_this.listener !== undefined) {
                if (_this.listener.onRegistrationToken !== undefined) {
                    _this.listener.onRegistrationToken(event.token);
                }
            }
        };
        _this.onNotification = function (event) {
            if (_this.listener !== undefined) {
                _this.listener.onNotification(event.payload, event.actionIdentifier);
            }
        };
        _this.onRegistrationRequired = function () {
            if (_this.listener !== undefined && _this.listener.onRegistrationRequired != undefined) {
                _this.listener.onRegistrationRequired();
            }
        };
        _this.configureListeners();
        return _this;
    }
    NotificationsModule.instance = function () {
        if (this._instance === undefined) {
            this._instance = new NotificationsModule();
        }
        return this._instance;
    };
    NotificationsModule.prototype.configureListeners = function () {
        this.configureRegistrationTokenListener();
        this.configureRegistrationRequiredListener();
        this.configureNotificationListener();
    };
    NotificationsModule.prototype.configureRegistrationTokenListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNNotifications.REGISTRATION_TOKEN_LISTENER_KEY, this.onRegistrationToken);
    };
    NotificationsModule.prototype.configureNotificationListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNNotifications.NOTIFICATION_LISTENER_KEY, this.onNotification);
    };
    NotificationsModule.prototype.configureRegistrationRequiredListener = function () {
        SyneriseModuleEmitter_1.SyneriseModuleEmitter.getEmitter().addListener(RNNotifications.REGISTRATION_REQUIRED_LISTENER_KEY, this.onRegistrationRequired);
    };
    /**
     * This method sets callbacks for notifications module.
     *
     * @param listener An object that implements the `INotificationsListener` interface
     */
    NotificationsModule.prototype.setListener = function (listener) {
        this.listener = listener;
    };
    /**
     * This method passes the Firebase Token to Synerise for notifications.
     *
     * @param registrationToken Firebase FCM Token returned after successful push notifications registration from Firebase
     * @param mobileAgreement Agreement (consent) for mobile push campaigns
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    NotificationsModule.prototype.registerForNotifications = function (registrationToken, mobileAgreement, onSuccess, onError) {
        var mobileAgreementCopy = false;
        var withMobileAgreement = false;
        if (mobileAgreement != null) {
            withMobileAgreement = true;
            mobileAgreementCopy = mobileAgreement;
        }
        SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithCallback(RNNotifications.registerForNotifications, [registrationToken, withMobileAgreement, mobileAgreementCopy], onSuccess, onError);
    };
    /**
     * This method verifies if a notification was sent by Synerise.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if a notification was sent by Synerise, otherwise `false`
     */
    NotificationsModule.prototype.isSyneriseNotification = function (payload) {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNNotifications.isSyneriseNotification, [payload]);
    };
    /**
     * This method verifies if a notification’s sender is Synerise and if the notification is a Simple Push campaign.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if the notification is Synerise Simple Push campaign provided by Synerise, otherwise returns `false`
     */
    NotificationsModule.prototype.isSyneriseSimplePush = function (payload) {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNNotifications.isSyneriseSimplePush, [payload]);
    };
    /**
     * This method verifies if a notification’s sender is Synerise and if the notification is a Silent Command.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if the notification is Synerise Silent Command provided by Synerise, otherwise returns `false`
     */
    NotificationsModule.prototype.isSilentCommand = function (payload) {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNNotifications.isSilentCommand, [payload]);
    };
    /**
     * This method verifies if a notification's sender is Synerise and if the notification is a Silent SDK Command.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if the notification is Synerise Silent SDK Command provided by Synerise, otherwise returns `false`
     */
    NotificationsModule.prototype.isSilentSDKCommand = function (payload) {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNNotifications.isSilentSDKCommand, [payload]);
    };
    /**
     * This method verifies if a notification is encrypted.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if the notification is encrypted, otherwise returns `false`
     */
    NotificationsModule.prototype.isNotificationEncrypted = function (payload) {
        return SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNNotifications.isNotificationEncrypted, [payload]);
    };
    /**
     * This method decrypts the notification payload.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns Notification’s key-value data object with decrypted content
     */
    NotificationsModule.prototype.decryptNotification = function (payload) {
        var decryptedPayloadObject = SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethodWithReturnValue(RNNotifications.decryptNotification, [payload]);
        var decryptionSuccess = decryptedPayloadObject[0];
        var decryptedObject = decryptedPayloadObject[1];
        if (decryptionSuccess == true && decryptedObject !== undefined) {
            return decryptedObject;
        }
        else {
            return null;
        }
    };
    /**
     * This method handles a notification payload and starts activity.
     *
     * @param payload Notification’s key-value data object
     */
    NotificationsModule.prototype.handleNotification = function (payload, actionIdentifier) {
        if (DeviceUtils_1.DeviceUtils.isPlatformIOS()) {
            SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNNotifications.handleNotification, [payload, actionIdentifier]);
        }
        else {
            SyneriseModuleConnector_1.SyneriseModuleConnector.invokeMethod(RNNotifications.handleNotification, [payload]);
        }
    };
    return NotificationsModule;
}(BaseModule_1.BaseModule));
exports.NotificationsModule = NotificationsModule;
