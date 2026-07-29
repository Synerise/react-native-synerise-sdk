import { BaseModule as Module } from './BaseModule';
import { InAppMessageData } from './../../classes/models/Misc/InAppMessageData';
import { InAppCustomMethodCompletion } from './../../classes/models/InApps/InAppCustomMethodCompletion';
import { SyneriseSource } from '../../classes/models/Misc/SyneriseSource';
interface IInjectorListener {
    onOpenUrl(url: string, source: SyneriseSource): void;
    onDeepLink(deepLink: string, source: SyneriseSource): void;
}
interface IInjectorInAppMessageListener {
    onPresent?(data: InAppMessageData): void;
    onHide?(data: InAppMessageData): void;
    onOpenUrl(data: InAppMessageData, url: string): void;
    onDeepLink(data: InAppMessageData, deepLink: string): void;
    onCustomAction?(data: InAppMessageData, name: string, parameters: object): void;
    onCustomMethod?(data: InAppMessageData, name: string, parameters: object, completion: InAppCustomMethodCompletion): void;
}
declare class InjectorModule extends Module {
    private static _instance;
    private listener;
    private inAppMessageListener;
    private inAppContextTarget;
    inAppContext: {
        [key: string]: any;
    };
    static instance(): InjectorModule;
    private constructor();
    private configureListeners;
    private configureMainListener;
    private configureInAppMessageListener;
    private onUrlAction;
    private onDeepLinkAction;
    private onInAppMessagePresent;
    private onInAppMessageHide;
    private onInAppMessageOpenUrlAction;
    private onInAppMessageDeepLinkAction;
    private onInAppMessageCustomAction;
    private onInAppMessageCustomMethod;
    private createInAppContextProxy;
    private pushInAppContext;
    /**
     * This method sets callbacks for an injector module.
     *
     * @param listener An object that implements the `IInjectorListener` interface
     *
     */
    setListener(listener: IInjectorListener): void;
    /**
     * This method sets callbacks for in-app message campaigns.
     *
     * @param listener An object that implements the `IInjectorInAppMessageListener` interface
     *
     */
    setInAppMessageListener(listener: IInjectorInAppMessageListener): void;
    /**
     * This method notifies current in-app messages that context from the app was changed.
     */
    notifyInAppContextChange(): void;
    /**
     * This method closes the current in-app message.
     *
     * @param campaignHash An identifier of the in-app message campaign that is currently opened
     *
     */
    closeInAppMessage(campaignHash: String): void;
    handleOpenUrlBySDK(url: string): void;
    handleDeepLinkBySDK(deepLink: string): void;
}
export { InjectorModule, IInjectorListener };
