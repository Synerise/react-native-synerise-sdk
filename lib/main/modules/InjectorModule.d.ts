import { BaseModule as Module } from './BaseModule';
import { InAppMessageData } from './../../classes/models/Misc/InAppMessageData';
import { Error } from './../../classes/types/Error';
import { SyneriseSource } from '../../classes/models/Misc/SyneriseSource';
interface IInjectorListener {
    onOpenUrl(url: string, source: SyneriseSource): void;
    onDeepLink(deepLink: string, source: SyneriseSource): void;
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
    /**
     * This method sets callbacks for an injector module.
     *
     * @param listener An object that implements the `IInjectorListener` interface
     *
     */
    setListener(listener: IInjectorListener): void;
    /**
     * This method sets callbacks for banner campaigns.
     *
     * @param listener An object that implements the `IInjectorBannerListener` interface
     *
     */
    setBannerListener(listener: IInjectorBannerListener): void;
    /**
     * This method sets the flag that determines whether banner campaigns can be shown
     *
     * @param shouldPresentBanner Determines whether banners can be shown
     *
     */
    setShouldBannerPresentFlag(shouldPresentBanner: boolean): void;
    /**
     * This method sets callbacks for walkthrough campaigns.
     *
     * @param listener An object that implements the `IInjectorWalkthroughListener` interface
     *
     */
    setWalkthroughListener(listener: IInjectorWalkthroughListener): void;
    /**
     * This method sets callbacks for in-app message campaigns.
     *
     * @param listener An object that implements the `IInjectorInAppMessageListener` interface
     *
     */
    setInAppMessageListener(listener: IInjectorInAppMessageListener): void;
    /**
     * This method fetches a walkthrough.
     *
     */
    getWalkthrough(): void;
    /**
     * This method shows a walkthrough when it is loaded.
     *
     */
    showWalkthrough(): void;
    /**
     * This method checks if a walkthrough is loaded.
     *
     * @returns `true` if the walkthrough is loaded, otherwise returns `false`
     */
    isWalkthroughLoaded(): boolean;
    /**
     * This method checks if the walkthrough is unique compared to the previous one.
     *
     * @returns `true` if the loaded walkthrough is unique, otherwise returns `false`
     */
    isLoadedWalkthroughUnique(): boolean;
    handleOpenUrlBySDK(url: string): void;
    handleDeepLinkBySDK(deepLink: string): void;
}
export { InjectorModule, IInjectorListener };
