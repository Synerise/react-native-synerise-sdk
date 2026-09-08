import React from 'react';
import { InAppMessageData } from './../../../classes/models/Misc/InAppMessageData';
import { InAppCustomMethodCompletion } from './../../../classes/models/InApps/InAppCustomMethodCompletion';
import { InlineInAppMessageData } from './../../../classes/models/Misc/InlineInAppMessageData';
interface IInjectorInAppMessageListener {
    onPresent?(data: InAppMessageData): void;
    onHide?(data: InAppMessageData): void;
    onOpenUrl(data: InAppMessageData, url: string): void;
    onDeepLink(data: InAppMessageData, deepLink: string): void;
    onCustomAction?(data: InAppMessageData, name: string, parameters: object): void;
    onCustomMethod?(data: InAppMessageData, name: string, parameters: object, completion: InAppCustomMethodCompletion): void;
}
interface IInlineInAppMessageListener {
    onInlineInAppAvailable(view: React.ReactElement, data: InlineInAppMessageData): void;
    onOpenUrl?(data: InlineInAppMessageData, url: string): void;
    onDeepLink?(data: InlineInAppMessageData, deepLink: string): void;
    onCustomAction?(data: InlineInAppMessageData, name: string, parameters: object): void;
    onCustomMethod?(data: InlineInAppMessageData, name: string, parameters: object, completion: InAppCustomMethodCompletion): void;
}
/**
 * Owns the in-app messaging bridge (overlay + inline). Reached through `InjectorModule`, which keeps
 * the public API and delegates here; the native module (`RNInjector`) and event names are unchanged.
 */
declare class InAppManager {
    private inAppMessageListener;
    private inlineInAppMessageListener;
    private inAppContextTarget;
    private inAppContextProxy;
    constructor();
    get inAppContext(): {
        [key: string]: any;
    };
    set inAppContext(context: {
        [key: string]: any;
    });
    private createInAppContextProxy;
    private pushInAppContext;
    notifyInAppContextChange(): void;
    private configureListeners;
    private configureInAppMessageListener;
    private configureInlineInAppMessageListener;
    private onInAppMessagePresent;
    private onInAppMessageHide;
    private onInAppMessageOpenUrlAction;
    private onInAppMessageDeepLinkAction;
    private onInAppMessageCustomAction;
    private onInAppMessageCustomMethod;
    private onInlineInAppMessageAvailable;
    private onInlineInAppMessageOpenUrlAction;
    private onInlineInAppMessageDeepLinkAction;
    private onInlineInAppMessageCustomAction;
    private onInlineInAppMessageCustomMethod;
    setInAppMessageListener(listener: IInjectorInAppMessageListener): void;
    setInlineInAppMessageListener(listener: IInlineInAppMessageListener): void;
    closeInAppMessage(campaignHash: String): void;
}
export { InAppManager, IInjectorInAppMessageListener, IInlineInAppMessageListener };
