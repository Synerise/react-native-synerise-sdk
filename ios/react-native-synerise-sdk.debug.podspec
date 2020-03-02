require 'json'

package = JSON.parse(File.read('./../package.json'))

SYNERISE_SDK_FRAMEWORK_VERSION = '3.5'

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package['version']
  s.summary       = package['description']
  s.homepage      = "https://synerise.com"
  s.license       = "MIT"
  s.author        = { "Synerise" => "developer@synerise.com" }
  s.platform      = :ios, "9.0"
  s.source        = { :git => "https://gitlab.synerise.com/Mobile/synerise-react-native-sdk.git", :branch => "MOB-793" }
  s.source_files  = "react-native-synerise-sdk/ios/ReactNativeSynerise/**/*.{h,m}"
  s.requires_arc  = true

  s.dependency "React"
  s.dependency 'SyneriseSDK', "~> #{SYNERISE_SDK_FRAMEWORK_VERSION}"

end

  