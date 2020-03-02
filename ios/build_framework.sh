set -e

FRAMEWORK_NAME="react-native-synerise-sdk"

rm -rf "./build"
rm -rf "./framework"

mkdir './build'
mkdir './framework'

xcodebuild BITCODE_GENERATION_MODE=bitcode OTHER_CFLAGS="-fembed-bitcode" -workspace "./RNSyneriseSDK.xcworkspace" -scheme "RNSyneriseSDK" ONLY_ACTIVE_ARCH=NO -configuration Release -arch arm64 -arch armv7 -arch armv7s defines_module=yes -sdk "iphoneos" SYMROOT=$(PWD)/build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED="NO" CODE_SIGN_ENTITLEMENTS="" CODE_SIGNING_ALLOWED="NO" build
xcodebuild -workspace "./RNSyneriseSDK.xcworkspace" -scheme "RNSyneriseSDK" -configuration Release -arch x86_64 -arch i386 ONLY_ACTIVE_ARCH=NO defines_module=yes -sdk "iphonesimulator" SYMROOT=$(PWD)/build CODE_SIGN_IDENTITY="" CODE_SIGNING_REQUIRED="NO" CODE_SIGN_ENTITLEMENTS="" CODE_SIGNING_ALLOWED="NO"

cp -r "./build/Release-iphoneos/RNSyneriseSDK.framework" "./build/RNSyneriseSDK.framework"
lipo -create -output "./build/RNSyneriseSDK.framework/RNSyneriseSDK" "./build/Release-iphoneos/RNSyneriseSDK.framework/RNSyneriseSDK" "./build/Release-iphonesimulator/RNSyneriseSDK.framework/RNSyneriseSDK"

cp -r "./build/RNSyneriseSDK.framework" "./framework/react-native-synerise-sdk.framework"

