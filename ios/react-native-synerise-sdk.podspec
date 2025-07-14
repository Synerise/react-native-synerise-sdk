require 'json'

package = JSON.parse(File.read('./../package.json'))

SYNERISE_SDK_FRAMEWORK_VERSION = '5.4.4'

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package['version']
  s.summary       = package['description']
  s.homepage      = "https://synerise.com"
  s.license       = { :type => "Apache License 2.0", :file => "LICENSE" }
  s.author        = { "Synerise" => "developer@synerise.com" }
  s.platform      = :ios, "13.0"
  s.source        = { :git => "https://github.com/Synerise/react-native-synerise-sdk", :tag => s.version.to_s }
  s.source_files  = "ios/ReactNativeSynerise/**/*.{h,m}"
  s.requires_arc  = true
  
  s.dependency "React"
  s.dependency 'SyneriseSDK', "#{SYNERISE_SDK_FRAMEWORK_VERSION}"

end

  