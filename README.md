# Synerise React Native SDK (react-native-synerise-sdk) (0.15.0)

[![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-orange.svg)](https://github.com/synerise/react-native-synerise-sdk)
[![Languages](https://img.shields.io/badge/language-TypeScript%20%7C%20Java%20%7C%20Objective--C-orange.svg)](https://github.com/synerise/react-native-synerise-sdk)
[![npm](https://img.shields.io/npm/v/react-native-synerise-sdk.svg)](https://www.npmjs.com/package/react-native-synerise-sdk)
[![Synerise](https://img.shields.io/badge/www-synerise-green.svg)](https://synerise.com)
[![Documentation](https://img.shields.io/badge/docs-latest-brightgreen.svg)](https://help.synerise.com/)

---

## About
[Synerise](http://www.synerise.com) SDK wrapper for React Native.

## Documentation
Most up-to-date documentation is available at [Synerise Help Center - Mobile SDK](https://help.synerise.com/developers/mobile-sdk).

## Requirements
* Access to workspace
* A Profile API Key
* Development environment configured - [React Native - Setting up the development environment](https://reactnative.dev/docs/environment-setup)

### Android
* Minimum Android SDK version - 21
* Supported targetSDKVersion - 33

### iOS
* Xcode 15 and iOS SDK 17
* iOS 9.0+ minimum deployment target
* Valid architectures: arm64 devices and arm64, x86_64 simulators

## Installation

1. Install module by `npm`:

   ```bash
   npm install react-native-synerise-sdk --save
   ```
   
2. If you are using React Native >= 0.60, install native dependencies via CocoaPods from your ios directory:

   ```bash
   pod install
   ```

3. Or if you are using React Native < 0.60, link native dependency:

   ```bash
   react-native link react-native-synerise-sdk
   ```
   and then, install from your ios directory:
   ```bash
   pod install --repo-update
   ```

4. Import Synerise SDK:

   ```javascript
   import { Synerise } from 'react-native-synerise-sdk';
   ```
   
### iOS

**Important**:
Please note that starting from React Native 0.60, CocoaPods is now the default integration approach for React Native iOS projects.

1. Add `pod 'react-native-synerise-sdk', :path => '../node_modules/react-native-synerise-sdk'` as a dependency in your ios/Podfile.

2. Your Podfile should now look like this:

	```ruby
	target 'YourTarget' do
	
	# Pods for your target
	pod 'React', :path => '../node_modules/react-native/'
	pod 'React-Core', :path => '../node_modules/react-native/React'
	# ... other React dependencies
       
	# Add react-native-synerise-sdk
	pod 'react-native-synerise-sdk', :path => '../node_modules/react-native-synerise-sdk'
       
	use_native_modules!

	end
	```

3. Run `pod install` from your ios directory.

If you prefer linking manually, check [React Native - Linking Libraries](http://facebook.github.io/react-native/docs/linking-libraries-ios.html#manual-linking) to link your libraries that contain native code.

### Android

1. Add `implementation 'com.synerise.sdk.react:react-native-synerise-sdk:0.15.0'` as a dependency in your app's build.gradle file.

2. Add `RNSyneriseSdkPackage` to your list your packages in application's main class as shown below:

	```java
	@Override
	protected List<ReactPackage> getPackages() {
		@SuppressWarnings("UnnecessaryLocalVariable")
		List<ReactPackage> packages = new PackageList(this).getPackages();
		packages.add(new RNSyneriseSdkPackage(getApplication()));
	
		return packages;
	}
	```

## Initialization:

```javascript
Synerise.Initializer()
	.withClientApiKey('YOUR_PROFILE_API_KEY')
	.init()
```

## Author
Synerise, developer@synerise.com. If you need support please feel free to contact us.