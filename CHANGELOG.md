# Changelog

All notable changes to this project will be documented in this file.

## [1.0.1] - 2025-04-01

### Fixed
- [iOS] `campaignId`, `schema`, `slug`, `uuid` properties mapping in `RecommendationResponse` object.

### Changed
- Improvements to stability.


## [1.0.0] - 2025-03-10

IMPORTANT:
- This major version is NOT backwards compatible.
- Update of native SDK's dependencies to 6.0.0 (Android) and 5.0.0 (iOS).
- [iOS] Support for older iOS versions ends. Minimum deployment target is changed to iOS 13.
- [iOS] Bitcode is not supported in SDK version 5.0.0 and higher. Xcode ignores bitcode.

### Added
- `appVersion` parameter for `client.applicationStarted` event. It is the same as `version`. `version` is deprecated.
- `sdkPreviousVersion` parameter for `client.applicationStarted` event. It is the version of the SDK before the current version in the application.

### Removed
- `Synerise.Client.authenticateByOAuth(accessToken:context:onSuccess:onError:)` method. You should use the`Synerise.Client.authenticate(token:provider:context:onSuccess:onError:)` method.
- `Synerise.Client.authenticateByOAuthIfRegistered(accessToken:context:onSuccess:onError:)` method. You should use the `Synerise.Client.authenticate(token:provider:context:onSuccess:onError:)` method.
- `Synerise.Client.authenticateByFacebook(facebookToken:context:onSuccess:onError:)` method. You should use the `Synerise.Client.authenticate(token:provider:context:onSuccess:onError:)` method.
- `Synerise.Client.authenticateByFacebookIfRegistered(facebookToken:context:onSuccess:onError:)` method. You should use the `Synerise.Client.authenticate(token:provider:context:onSuccess:onError:)` method.
- `Synerise.Client.authenticateByAppleSignIn(identityToken:context:onSuccess:onError:)` method. You should use the `Synerise.Client.authenticate(token:provider:context:onSuccess:onError:)` method.
- `Synerise.Client.authenticateByAppleSignInIfRegistered(identityToken:context:onSuccess:onError:)` method. You should use the `Synerise.Client.authenticate(token:provider:context:onSuccess:onError:)` method.
- `Synerise.Client.deleteAccountByOAuth(accessToken:onSuccess:onError:)` method. You should use the `Synerise.Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError:)` method.
- `Synerise.Client.deleteAccountByFacebook(facebookToken:onSuccess:onError:)` method. You should use the `Synerise.Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError:)` method.
- `Synerise.Client.deleteAccountByAppleSignIn(identityToken:onSuccess:onError:)` method. You should use the `Synerise.Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError:)` method.
- `IInjectorWalkthroughListener` for handling actions from Walkthrough campaigns.
- `IInjectorBannerListener` for handling actions from Banner campaigns.
- `Synerise.Content.getDocument(slug:onSuccess:onError:)` method. You should use `Synerise.Content.generateDocument(slug:onSuccess:onError:)` method.
- `Synerise.Content.getDocuments(apiQuery:onSuccess:onError:)` method.
- `Synerise.Content.getRecommendations(options:onSuccess:onError:)` method.
- `Synerise.Content.getScreenView(onSuccess:onError:)` method and correlated models (`ScreenViewResponse`, `ScreenViewAudience`). You should use the `Synerise.Content.generateScreenView(feedSlug:onSuccess:onError:)` or the `Synerise.Content.generateScreenViewWithApiQuery(apiQuery:onSuccess:onError:)` method.
- `Synerise.Notifications.isSyneriseBanner(payload:)`
- `Synerise.Injector.getWalkthrough()` method.
- `Synerise.Injector.showWalkthrough()` method.
- `Synerise.Injector.isWalkthroughLoaded()` method.
- `Synerise.Injector.isLoadedWalkthroughUnique()` method.
- `Synerise.Injector.getPushes(success:failure:)` method.
- [iOS] `deviceID` parameter from `client.applicationStarted` event. It was redundant with the `deviceId` parameter.

### Changed
- Synerise initialization builder method `withClientApiKey(clientApiKey:)` to `withApiKey(apiKey:)`.
- `Synerise.changeClientApiKey(clientApiKey:config:)` to `Synerise.changeApiKey(apiKey:config:)`.
- `Synerise.Client.activateAccount(email:onSuccess:onError:)` to `Synerise.Client.requestAccountActivation(email:onSuccess:onError:)`.
- `Synerise.Client.confirmAccount(token:onSuccess:onError:)` to `Synerise.Client.confirmAccountActivation(token:onSuccess:onError:)`.
- `TokenOrigin.oauth` enum value changed to `TokenOrigin.OAuth`.
- Improvements to stability.


## [0.24.3] - 2024-11-12

### Fixed
- [iOS] Potential issues with checking if the app is launched in the background. The SDK set the background mode to true on `UIScene` and SwiftUI based apps. It could cause the app to freeze.


## [0.24.2] - 2024-10-15

### Fixed
- [iOS] Optimization of the registration for push notifications process. The cache for that request was erroneously removed in version 4.23.0 of the native SDK.


## [0.24.1] - 2024-10-14

### Fixed
- [Android] workManager npe - for android api lower than 24

### Changed
- Update of native SDK's dependencies.


## [0.24.0] - 2024-10-07

### Fixed
- [iOS] Some potential issues with possible database corruption.
- [Android] Notification callback issue when app was in foreground.

### Added
- `Synerise.Settings.inAppMessaging.contentBaseUrl` option in settings to let you set the base URL to use for all relative URLs in an in-app message's creation.
- `Synerise.Client.updateAccountBasicInformation(context, onSuccess, onError)` method. The new method updates anonymous users.
- `ClientAccountUpdateBasicInformationContext` model correlated with the new `Synerise.Client.updateAccountBasicInformation(context, onSuccess, onError)` method.

### Changed
- [Android] Fresco library is now updated to 3.2.0.
- Optimization of the In-app messaging module (variants are no longer assigned once more when the profile's UUID changes).
- Improvements to stability.


## [0.23.1] - 2024-09-16

### Fixed
- [Android] Null pointer exception while launching callback from push notification in some cases.


## [0.23.0] - 2024-08-05

### Fixed
- [iOS] Potential issue with slow SDK initialization.
- [iOS] Potential issues with Simple Authentication requests.

### Added
- We added new parameters to the push.click event: `clickSource`, `actionType`, `url` and `actionButtonTitle`.

### Changed
- Update of native SDK's dependencies.


## [0.22.0] - 2024-07-16

IMPORTANT: 
The SDK version 0.21.0 has been omitted for technical reasons.

### Added
- We added a`testDelivery` and `journeyId` parameters to tracked notification events (`push.view`, `push.click`, and so on). It describes if the notification was sent as a test notification from a campaign.
- We added a new `Synerise.content.generateDocumentWithApiQuery(apiQuery, onSuccess, onError)` method. It is analogous to `Synerise.content.generateDocument(slug:onSuccess:onError:)`, but can contain more context parameters provided in a query object.
- We added a new `Content.generateScreenViewWithApiQuery(apiQuery, onSuccess, onError)` method. It is analogous to `Synerise.content.generateScreenView(feedSlug:onSuccess:onError:)`, but can contain more context parameters provided in a query object.
- Anchors from Drag & Drop Builder in the In-App editor are interpreted as URL or as deeplink depending on the value.

### Changed
- We added validation of reserved parameters in events. Now, if a parameter is forbidden, it is removed from the parameters and a log is printed.
- Stability improvements.
- Update of native SDK's dependencies.

## [0.20.0] - 2024-06-02

### Fixed
- [iOS] Some potential issues with retrieving system push consent by the SDK. The SDK set the constent to false when the general consent for the application was enabled, but at least one of the following options was disabled: alerts, sounds, badges.

### Added
- `Synerise.Settings.tracker.eventsTriggeringFlush` option in settings to let you set the list of event actions which will trigger instant sending of all events in the queue. The default array contains only push event's actions.

### Changed
- All events connected with push campaigns will flush the queue and send events immediately.
- Improvements to push notifications registration.
- Stability improvements.
- Update of native SDK's dependencies.


## [0.19.0] - 2024-04-09

### Fixed
- [Android] Deeplink action when clicking on push notification will directly open in app instead of prompt between app/browser. We set packageName to intent.
- [Android] Updated proguard rules for  joda.time, retrofit and gson.
- [iOS] Some potential issues with notification processing in `NotificationServiceExtension`.
- [iOS] Issue with non-scrolling in-app messages.

### Added
- Global Control Group support for in-app messages. From now on, you can use this feature in in-app messaging communication. This lets you take your marketing efforts to the next level and provides a solid foundation for accurate measurement of campaign effectiveness. Read more at https://hub.synerise.com/docs/settings/configuration/global-control-group/.
- [iOS] `Synerise.Settings.sdk.localizable` option in settings to let you localize some strings displayed by the SDK.

### Changed
- Improved mechanism for checking capping in in-app messages. The number of views no longer resets when the account's UUID changes.
- The delegate method `snr_registerForPushNotificationsIsNeeded()` is invoked when the SDK is initialized completely.
- When the `Client.registerForPush(registrationToken:mobilePushAgreement:success:failure:)` method fails, it invokes the `snr_registerForPushNotificationsIsNeeded()` delegate method after a short delay.
- `clientId` property in the `Token` model.
- Update of native SDK's dependencies.


## [0.18.0] - 2024-01-16

IMPORTANT: 
Due to changes in the handling of actions for URLs and deep links in Synerise campaigns, we strongly recommend comparing your configuration with the SDK documentation. Review the changes from the previous SDK version integrated into your application here: 
https://hub.synerise.com//developers/mobile-sdk/campaigns/action-handling/

### Changed
- Changes in handling actions from campaigns (read important note above).
- Update of native SDK's dependencies.


## [0.17.0] - 2023-12-05

### Fixed
- [iOS] Issue with location of some SDK files in the Documents directory. The old location caused the SDK files to be visible in the shared documents directory if the host application file sharing was enabled.
- [iOS] Potential issue with native notification buttons when Simple Push campaign contained Rich Media (Single Media) or had a custom notification category identifier.

### Added
- We added a new `Synerise.Content.generateDocument(slug:onSuccess:onError:)` method. It's analogous to `Synerise.Content.getDocument(slug:onSuccess:onError:)`. The old method is deprecated. The new method generates the document that is defined for the provided slug.
- We added a new `Synerise.Content.getRecommendationsV2(options:onSuccess:onError:)` method. It's analogous to `Synerise.Content.getRecommendations(options:onSuccess:onError:)`. The old method is deprecated. The new method gets recommendations that are defined for the options provided.
- We added a new `Synerise.Content.generateScreenView(feedSlug:onSuccess:onError:)` method. It's analogous to `Synerise.Content.getScreenView(onSuccess:onError:)`. The old method is deprecated. The new method generates a customer's highest-priority screen view campaign that is defined for the provided slug.
- We added models correlating with new methods: `ScreenView`, `Document`.

### Changed
- `Synerise.Content.getDocument(slug:onSuccess:onError:)` is deprecated now.
- `Synerise.Content.getDocuments(apiQuery:onSuccess:onError:)` is deprecated now.
- `Synerise.Content.getRecommendations(options:onSuccess:onError:)` is deprecated now.
- `Synerise.Content.getScreenView(onSuccess:onError:)` is deprecated now.
- Update of native SDK's dependencies.


## [0.16.0] - 2023-10-30

### Added
- `Synerise.Settings.inAppMessaging.shouldSendInAppCappingEvent` option in settings to enable or disable sending inApp.capping event by the SDK.

### Changed
- Update of native SDK's dependencies.
- Improvements to stability.

## [0.15.0] - 2023-08-11

### Added
- New authentication mechanism - Simple Authentication. It allows identification of customers without implementing more complicated processes such as RaaS, OAuth, or authenticating by third party services, for example Facebook or Apple. Simple Authentication needs only two methods - `Synerise.Client.simpleAuthentication(data:authID:onSuccess:onError:)` to recognize a customer and `Synerise.Client.isSignedInViaSimpleAuthentication()` to check if the customer is signed in and uses the Simple Authentication feature. The `Synerise.Client.signOut()` method and similar methods are a common way to sign out and clear the user context.

### Changed
- We changed nullability of `mobileAgreements` parameter in a `Synerise.Notifications.registerForPush(registrationToken:success:failure:)` method. It doesn't require the`mobilePushAgreement` parameter (it can be null) and thanks to that, it doesn't update the customer in the database.
- Update of native SDK's dependencies.


## [0.14.0] - 2023-06-15

### Fixed
- `Synerise.isInitialized` method checks native and javascript module if it is completely initialized.

### Added
- We added a new `Client.signOut(mode:fromAllDevices:onSuccess:onError:)` method. It is analogous to Client.signOut(mode:). It is an asynchronous method and notifies the backend that the client is signed out and determines if all other devices should be signed out too. Remember, signOutWithSessionDestroy mode clears the anonymous session and regenerates the client UUID. The `Client.signOut(mode:)` method is removed now.
- TSDoc code documentation in modules for better syntax promting.

### Changed
- `Client.deleteAccount(password:onSuccess:onError:)` is deprecated now.
- `Client.deleteAccountByOAuth(accessToken:onSuccess:onError)` is deprecated now.
- `Client.deleteAccountByFacebook(facebookToken:onSuccess:onError)` is deprecated now.
- Update of native SDK's dependencies.
- Improvements to stability.


## [0.13.0] - 2023-05-19

### Fixed
- [iOS] `PromotionImage` property mapping in `Promotion` object.

### Changed
- `RecommendationSeenEvent` and `RecommendationClickEvent` have new constructors, same as parent `RecommendationViewEvent` class before.
- Update of native SDK's dependencies.
- Improvements to stability.

### Added
- `RecommendationViewEvent` class.


## [0.12.0] - 2023-03-27

### Fixed
- Voucher objects mapping.

### Changed
- `Token` object structure.
- Update of native SDK's dependencies.
- Improvements to stability.

### Added
- In-app messaging support.

### Removed
- `Injector.fetchBanners` method.
- `Injector.getBanners` method.
- `Injector.showBanner` method.


## [0.11.0] - 2023-02-07

### Fixed
- [Android] Fix initialization with custom url.

### Changed
- Update of native SDK's dependencies.
- Improvements to stability.


## [0.10.5] - 2022-07-26

### Fixed
- Fix issue with `ClientAgreements` model with conversion for native modules communication.


## [0.10.4] - 2022-07-15

### Fixed
- [Android] Fix issue with push notification click tracker.


## [0.10.3] - 2022-06-17

### Fixed
- [iOS] Potential issue with sending push.view events in notification services.
- [iOS] Some clients have issue with correct value of sdkVersion in AppStarted event, which propably occurs depending to project settings. We have changed it to save hardcoded value so it will solve those issues permanently.

### Changed
- Update of native SDK's dependencies.


## [0.10.2] - 2022-04-27

### Changed
- Update of native SDK's dependencies.


## [0.10.1] - 2022-03-01

### Fixed
- [Android] Added action_view intent for deeplinks on Android.
- [iOS] Notification category collision when Simple Push campaign contains configured buttons and Rich Media (Single Image).

### Changed
- Update of native SDK's dependencies.


## [0.10.0] - 2022-02-15

### Added
- React Native Reload support.
- [iOS] Notification responses (tap on push, push buttons etc.) are supported now.

### Changed
- Update of native SDK's dependencies.


## [0.9.19] - 2021-11-03

### Added
- `Client.signInConditionally` method.
- `Client.authenticate` method.
- `Client.authenticateConditionally` method.
- `Client.requestAccountActivationByPin` method.
- `Client.confirmAccountActivationByPin` method.
- `Promotions.activatePromotionsBatch` method.
- `Promotions.deactivatePromotionsBatch` method.
- Client State Change listener in `Synerise.Client` module.
- Promotion models update.

### Changed
- Update of native SDK's dependencies.
- Improvements to stability.


## [0.9.18] - 2021-04-13

### Added
- `Content.getScreenView` method.

### Changed
- `Client.requestEmailChange` method.
- Support for Recommendations v2.
- Update of native SDK's.
- Improvements to stability.


## [0.9.17] - 2021-02-16

### Changed
- Update of native SDK's.
- Improvements to stability.


## [0.9.16] - 2020-12-11

### Changed
- Improvements to stability.


## [0.9.15] - 2020-12-10

### Added

- Information about device root is moved to AppStarted event.
- New option to set whether events should be sent when server time synchronization has failed - `Synerise.Settings.tracker.isBackendTimeSyncRequired`.
- `Client.deleteAccountByIdentityProvider` method.

## [0.9.14] - 2020-10-15

### Added

- Support for encrypted notifications (enabled by `Synerise.Settings.notifications.encryption`). [1]

[1] Please read full documentation:
iOS: https://help.synerise.com/developers/ios-sdk/configure-notifications/#configuring-notification-encryption
Android: https://help.synerise.com/developers/android-sdk/configure-notifications/#configuring-notification-encryption


## [0.9.13] - 2020-07-09

### Fixed

- CocoaPods config files.


## [0.9.12] - 2020-07-09

### Added

- `Synerise.Client.authenticateByAppleSignIn` method.
- `Synerise.Client.authenticateByAppleSignInIfRegistered` method.
- `Synerise.Injector.authenticateByOAuthIfRegistered` method.
- `Synerise.Injector.deleteAccountByOAuth` method.
- `Synerise.Injector.deleteAccountByAppleSignIn` method.
- `Synerise.Settings.sdk.shouldDestroySessionOnApiKeyChange` option in settings.

## [0.9.11] - 2020-05-18

### Added

- `Synerise.Injector.fetchBanners` method.
- `Synerise.Injector.getBanners` method.
- `Synerise.Injector.setShouldBannerPresentFlag` method.

## [0.9.10] - 2020-04-23

### Added

- `Synerise.Content` module.
- `Synerise.Client.destroySession` method.
- `Synerise.Client.regenerateUUIDWithClientIdentifier` method.

## [0.9.9] - 2020-03-24

### Fixed

- parsing custom parameters by event constructor on iOS.

## [0.9.8] - 2020-03-04

### Fixed

- `Synerise.Settings` module issues.

## [0.9.7] - 2020-03-02

### Added

- OAuth/Facebook authentication.
- Walkthrough campaign.
- Walkthrough listener in `Synerise.Injector` module.
- `Synerise.Settings.injector.automatic` option in settings.
- Vouchers methods in `Synerise.Promotions` module.
- `Synerise.changeClientApiKey` method.

### Changed

- Prevention from SDK initializing multiple times (react native fast refresh).

### Removed

- Tags removed from some models (`ClientAccountUpdateContext`, `ClientAccountRegisterContext`).

## [0.9.6] - 2019-12-05

### Added

- `Synerise.Notifications` module.
- `Synerise.Promotions` module.
- Campaigns (Simple Push, Banner, Mandatory Update).
- Settings for campaigns.
- Handling URL and DeepLink actions from campaigns.

### Changed

- Synerise initialization (`Synerise.onReady` and `Synerise.onError` callbacks).

## [0.9.5] - 2019-11-08

### Fixed

- CocoaPods podspec file.

## [0.9.4] - 2019-11-08

### Fixed

- CocoaPods podspec file path.

## [0.9.3] - 2019-11-08

### Fixed

- npm package structure

## [0.9.2] - 2019-11-08

### Added

- ios/android native modules.

## [0.9.1] - 2019-11-08

### Added

- README to npm package.

### Fixed

- iOS Deployment Target to 9.0.

## [0.9.0] - 2019-11-08

The first version of `react-native-synerise-sdk` module
