import { BaseModule as Module } from './BaseModule';
import { Error } from './../../classes/types/Error';
interface INotificationsListener {
    onRegistrationToken?(token: string): void;
    onRegistrationRequired?(): void;
    onNotification?(payload: object, actionIdentifier: string | null): void;
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
    /**
     * This method sets callbacks for notifications module.
     *
     * @param listener An object that implements the `INotificationsListener` interface
     */
    setListener(listener: INotificationsListener): void;
    /**
     * This method passes the Firebase Token to Synerise for notifications.
     *
     * @param registrationToken Firebase FCM Token returned after successful push notifications registration from Firebase
     * @param mobileAgreement Agreement (consent) for mobile push campaigns
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    registerForNotifications(registrationToken: string, mobileAgreement: boolean | null, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method verifies if a notification was sent by Synerise.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if a notification was sent by Synerise, otherwise `false`
     */
    isSyneriseNotification(payload: object): boolean;
    /**
     * This method verifies if a notification’s sender is Synerise and if the notification is a Simple Push campaign.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if the notification is Synerise Simple Push campaign provided by Synerise, otherwise returns `false`
     */
    isSyneriseSimplePush(payload: object): boolean;
    /**
     * This method verifies if a notification’s sender is Synerise and if the notification is a Silent Command.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if the notification is Synerise Silent Command provided by Synerise, otherwise returns `false`
     */
    isSilentCommand(payload: object): boolean;
    /**
     * This method verifies if a notification's sender is Synerise and if the notification is a Silent SDK Command.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if the notification is Synerise Silent SDK Command provided by Synerise, otherwise returns `false`
     */
    isSilentSDKCommand(payload: object): boolean;
    /**
     * This method verifies if a notification is encrypted.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns `true` if the notification is encrypted, otherwise returns `false`
     */
    isNotificationEncrypted(payload: object): boolean;
    /**
     * This method decrypts the notification payload.
     *
     * @param payload Notification’s key-value data object
     *
     * @returns Notification’s key-value data object with decrypted content
     */
    decryptNotification(payload: object): object | null;
    /**
     * This method handles a notification payload and starts activity.
     *
     * @param payload Notification’s key-value data object
     */
    handleNotification(payload: object, actionIdentifier: string | null): void;
}
export { NotificationsModule, INotificationsListener };
