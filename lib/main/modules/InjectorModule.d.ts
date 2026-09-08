import { BaseModule as Module } from './BaseModule';
import { SyneriseSource } from '../../classes/models/Misc/SyneriseSource';
import { IInjectorInAppMessageListener, IInlineInAppMessageListener } from './inapp/InAppManager';
interface IInjectorListener {
    onOpenUrl(url: string, source: SyneriseSource): void;
    onDeepLink(deepLink: string, source: SyneriseSource): void;
}
declare class InjectorModule extends Module {
    private static _instance;
    private listener;
    private inAppManager;
    get inAppContext(): {
        [key: string]: any;
    };
    set inAppContext(context: {
        [key: string]: any;
    });
    static instance(): InjectorModule;
    private constructor();
    private configureMainListener;
    private onUrlAction;
    private onDeepLinkAction;
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
     * This method sets callbacks for inline in-app message campaigns.
     *
     * @param listener An object that implements the `IInlineInAppMessageListener` interface
     *
     */
    setInlineInAppMessageListener(listener: IInlineInAppMessageListener): void;
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
export { InjectorModule, IInjectorListener, IInlineInAppMessageListener };
