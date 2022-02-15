import { BaseModule as Module } from './BaseModule';
import { Error } from './../../classes/types/Error';
interface INotificationsListener {
    onRegistrationToken?(token: string): void;
    onRegistrationRequired?(): void;
    onNotification(payload: object, actionIdentifier: string | null): void;
}
declare class NotificationsModule extends Module {
    private static _instance;
    private listener;
    static instance(): NotificationsModule;
    private constructor();
    private configureListeners;
    private configureRegistrationTokenListener;
    private configureNotificationListener;
    private configureRegistrationRequiredListener;
    private onRegistrationToken;
    private onNotification;
    private onRegistrationRequired;
    setListener(listener: INotificationsListener): void;
    registerForNotifications(registrationToken: string, mobileAgreement: boolean, onSuccess: () => void, onError: (error: Error) => void): void;
    isSyneriseNotification(payload: object): boolean;
    isSyneriseSimplePush(payload: object): boolean;
    isSyneriseBanner(payload: object): boolean;
    isSilentCommand(payload: object): boolean;
    isSilentSDKCommand(payload: object): boolean;
    isNotificationEncrypted(payload: object): boolean;
    decryptNotification(payload: object): object | null;
    handleNotification(payload: object, actionIdentifier: string | null): void;
}
export { NotificationsModule, INotificationsListener };
