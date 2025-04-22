//
//  RNSyneriseManager.m
//  react-native-synerise-sdk
//
//  Created by Synerise
//  Copyright © 2021 Synerise. All rights reserved.
//

#import "RNSyneriseManager.h"
#import "RNSettings.h"
#import "RNSynerise.h"
#import "RNSyneriseNotifications.h"
#import "RNClient.h"
#import "RNTracker.h"
#import "RNInjector.h"
#import "RNPromotions.h"
#import "RNContent.h"

NS_ASSUME_NONNULL_BEGIN

@interface RNSyneriseManager () <RNSyneriseManagerDelegate>

@property (strong, nonatomic, nullable, readonly) NSMutableDictionary *modules;
@property (strong, nonatomic, nullable, readonly) NSMutableArray<id<RNSyneriseManagerDelegate>> *delegates;

@end

@implementation RNSyneriseManager {
    BOOL _applicationJavaScriptIsLoaded;
    BOOL _syneriseJavaScriptIsLoaded;
}

+ (void)load {
    NSArray *nativeModulesToCreate = @[
        RNSettings.class,
        RNSynerise.class,
        RNSyneriseNotifications.class,
        RNClient.class,
        RNTracker.class,
        RNInjector.class,
        RNPromotions.class,
        RNContent.class
    ];
    
    for (Class aClass in nativeModulesToCreate) {
        [[self sharedInstance] addModuleFromClass:aClass];
    }
}

#pragma mark - Lifecycle

+ (id)sharedInstance {
    static RNSyneriseManager *sharedInstance = nil;
    static dispatch_once_t onceToken;
    
    dispatch_once(&onceToken, ^{
        sharedInstance = [[self alloc] init];
    });
    
    return sharedInstance;
}

- (instancetype)init {
    self = [super init];
    
    if (self) {
        _modules = [@{} mutableCopy];
        _delegates = [@[] mutableCopy];
        
        _applicationJavaScriptIsLoaded = NO;
        _syneriseJavaScriptIsLoaded = NO;
        
        [self startObserving];
    }
    
    return self;
}

- (void)dealloc {
    [self stopObserving];
}

- (void)startObserving {
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(applicationJavaScriptDidFinishLoad) name:RCTJavaScriptDidLoadNotification object:nil];
    [[NSNotificationCenter defaultCenter] addObserver:self selector:@selector(syneriseJavaScriptDidFinishLoad:) name:kRNSyneriseJavaScriptDidLoadNotification object:nil];
}

- (void)stopObserving {
    [[NSNotificationCenter defaultCenter] removeObserver:self];
}

#pragma mark - Custom Accessors

- (nullable RNInjector *)injector {
    return [self getModuleForClass:RNInjector.class];
}

- (nullable RNSyneriseNotifications *)notifications {
    return [self getModuleForClass:RNSyneriseNotifications.class];
}

#pragma mark - Public

- (void)addDelegate:(id<RNSyneriseManagerDelegate>)delegate {
    if ([delegate conformsToProtocol:@protocol(RNSyneriseManagerDelegate)] == YES) {
        [self.delegates addObject:delegate];
    }
}

- (BOOL)isApplicationJavaScriptLoaded {
    return _applicationJavaScriptIsLoaded;
}

- (BOOL)isSyneriseJavaScriptLoaded {
    return _syneriseJavaScriptIsLoaded;
}

#pragma mark - Private

- (void)addModuleFromClass:(Class)aClass {
    id module = [aClass new];
    [self.modules setObject:module forKey:NSStringFromClass(aClass)];
}

- (nullable id)getModuleForClass:(Class)aClass {
    id module = self.modules[NSStringFromClass(aClass)];
    if (module != nil && [module isKindOfClass:aClass] == YES) {
        return module;
    }
    
    return nil;
}

- (void)applicationJavaScriptDidFinishLoad {
    _applicationJavaScriptIsLoaded = YES;
    
    for (id<RNSyneriseManagerDelegate> delegate in self.delegates) {
        if ([delegate respondsToSelector:@selector(applicationJavaScriptDidLoad)] == YES) {
            [delegate applicationJavaScriptDidLoad];
        }
    }
}

- (void)syneriseJavaScriptDidFinishLoad:(NSNotification *)notification {
    _syneriseJavaScriptIsLoaded = YES;
    
    for (id<RNSyneriseManagerDelegate> delegate in self.delegates) {
        if ([delegate respondsToSelector:@selector(syneriseJavaScriptDidLoad)] == YES) {
            [delegate syneriseJavaScriptDidLoad];
        }
    }
}

@end

NS_ASSUME_NONNULL_END
