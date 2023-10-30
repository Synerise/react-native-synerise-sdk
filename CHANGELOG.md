# Changelog

All notable changes to this project will be documented in this file.

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
- New option to set whether events should be sent when server time synchronization has failed - `Synerise.settings.tracker.isBackendTimeSyncRequired`.
- `Client.deleteAccountByIdentityProvider` method.

## [0.9.14] - 2020-10-15

### Added

- Support for encrypted notifications (enabled by `Synerise.settings.notifications.encryption`). [1]

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
- `Synerise.settings.sdk.sdk.shouldDestroySessionOnApiKeyChange` option in settings.

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

- `Synerise.settings` module issues.

## [0.9.7] - 2020-03-02

### Added

- OAuth/Facebook authentication.
- Walkthrough campaign.
- Walkthrough listener in `Synerise.Injector` module.
- `Synerise.settings.injector.automatic` option in settings.
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
