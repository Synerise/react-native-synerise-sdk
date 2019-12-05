import { BaseModule as Module } from './BaseModule';
interface IInjectorListener {
    onOpenUrl(url: string): void;
    onDeepLink(deepLink: string): void;
    onPresentBanner?(): void;
    onHideBanner?(): void;
}
declare class InjectorModule extends Module {
    private static _instance;
    private listener;
    static instance(): InjectorModule;
    private constructor();
    private configureListeners;
    private configureUrlActionListener;
    private configureDeepLinkActionListener;
    private configureBannerPresentedListener;
    private configureBannerHiddenListener;
    private onUrlAction;
    private onDeepLinkAction;
    private onPresentBanner;
    private onHideBanner;
    setListener(listener: IInjectorListener): void;
}
export { InjectorModule, IInjectorListener };
