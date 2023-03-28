import { BaseModule as Module } from './BaseModule';
import { InAppMessageData } from './../../classes/models/Misc/InAppMessageData';
import { Error } from './../../classes/types/Error';
interface IInjectorListener {
    onOpenUrl(url: string): void;
    onDeepLink(deepLink: string): void;
}
interface IInjectorBannerListener {
    onPresent?(): void;
    onHide?(): void;
}
interface IInjectorWalkthroughListener {
    onLoad?(): void;
    onLoadingError?(error: Error): void;
    onPresent?(): void;
    onHide?(): void;
}
interface IInjectorInAppMessageListener {
    onPresent?(data: InAppMessageData): void;
    onHide?(data: InAppMessageData): void;
    onOpenUrl(data: InAppMessageData, url: string): void;
    onDeepLink(data: InAppMessageData, deepLink: string): void;
    onCustomAction?(data: InAppMessageData, name: string, parameters: object): void;
}
declare class InjectorModule extends Module {
    private static _instance;
    private listener;
    private bannerListener;
    private walkthroughListener;
    private inAppMessageListener;
    static instance(): InjectorModule;
    private constructor();
    private configureListeners;
    private configureMainListener;
    private configureBannerListener;
    private configureWalkthroughListener;
    private configureInAppMessageListener;
    private onUrlAction;
    private onDeepLinkAction;
    private onBannerPresent;
    private onBannerHide;
    private onWalkthroughLoad;
    private onWalkthroughLoadingError;
    private onWalkthroughPresent;
    private onWalkthroughHide;
    private onInAppMessagePresent;
    private onInAppMessageHide;
    private onInAppMessageOpenUrlAction;
    private onInAppMessageDeepLinkAction;
    private onInAppMessageCustomAction;
    setListener(listener: IInjectorListener): void;
    setBannerListener(listener: IInjectorBannerListener): void;
    setShouldBannerPresentFlag(shouldPresentBanner: boolean): void;
    setWalkthroughListener(listener: IInjectorWalkthroughListener): void;
    setInAppMessageListener(listener: IInjectorInAppMessageListener): void;
    getWalkthrough(): void;
    showWalkthrough(): void;
    isWalkthroughLoaded(): boolean;
    isLoadedWalkthroughUnique(): boolean;
}
export { InjectorModule, IInjectorListener };
