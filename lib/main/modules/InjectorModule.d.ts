import { BaseModule as Module } from './BaseModule';
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
declare class InjectorModule extends Module {
    private static _instance;
    private listener;
    private bannerListener;
    private walkthroughListener;
    static instance(): InjectorModule;
    private constructor();
    private configureListeners;
    private configureMainListener;
    private configureBannerListener;
    private configureWalkthroughListener;
    private configureUrlActionListener;
    private configureDeepLinkActionListener;
    private configureBannerPresentedListener;
    private configureBannerHiddenListener;
    private configureWalkthroughLoadedListener;
    private configureWalkthroughLoadingErrorListener;
    private configureWalkthroughPresentedListener;
    private configureWalkthroughHiddenListener;
    private onUrlAction;
    private onDeepLinkAction;
    private onPresentBanner;
    private onHideBanner;
    private onLoadWalkthrough;
    private onLoadingErrorWalkthrough;
    private onPresentWalkthrough;
    private onHideWalkthrough;
    setListener(listener: IInjectorListener): void;
    setBannerListener(listener: IInjectorBannerListener): void;
    setWalkthroughListener(listener: IInjectorWalkthroughListener): void;
    getWalkthrough(): void;
    showWalkthrough(): void;
    isWalkthroughLoaded(): boolean;
    isLoadedWalkthroughUnique(): boolean;
}
export { InjectorModule, IInjectorListener };
