# Changelog

All notable changes to this project will be documented in this file.

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
