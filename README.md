# Synerise React Native SDK (react-native-synerise-sdk)

![Platform](https://img.shields.io/badge/platform-ios%20%7C%20android-lightgrey)
[![npm](https://img.shields.io/npm/v/react-native-synerise-sdk.svg?colorB=blue&)](https://www.npmjs.com/package/react-native-synerise-sdk)

## Documentation

Most up-to-date documentation is available at Synerise Help Center:
- [iOS SDK]( https://help.synerise.com/developers/ios-sdk)
- [Android SDK]( https://help.synerise.com/developers/android-sdk/)

## Requirements

### iOS

* Xcode 11 and iOS SDK 13
* iOS 9.0+ target deployment
* Valid architectures: armv7, armv7s, arm64 devices and i386, x86_64 simulators

### Android

* Minimum Android SDK version - 19

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

1. Add `implementation 'com.synerise.sdk.react:react-native-synerise-sdk:0.9.6'` as a dependency in your app's build.gradle file.

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
	.withClientApiKey('YOUR_CLIENT_API_KEY')
	.withDebugModeEnabled(true)
	.withCrashHandlingEnabled(true)
	.init()
```

## Author
Synerise, developer@synerise.com. If you need support please feel free to contact us.



