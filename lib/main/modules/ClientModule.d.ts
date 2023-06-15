import { BaseModule as Module } from './BaseModule';
import { ClientAccountRegisterContext } from './../../classes/models/Client/ClientAccountRegisterContext';
import { ClientAccountUpdateContext } from './../../classes/models/Client/ClientAccountUpdateContext';
import { ClientAccountInformation } from './../../classes/models/Client/ClientAccountInformation';
import { ClientAuthContext } from '../../classes/models/Client/ClientAuthContext';
import { ClientOAuthAuthenticationContext } from '../../classes/models/Client/ClientOAuthAuthenticationContext';
import { ClientFacebookAuthenticationContext } from '../../classes/models/Client/ClientFacebookAuthenticationContext';
import { ClientAppleSignInAuthenticationContext } from '../../classes/models/Client/ClientAppleSignInAuthenticationContext';
import { ClientIdentityProvider } from '../../classes/models/Client/ClientIdentityProvider';
import { ClientConditionalAuthResult } from '../../classes/models/Client/ClientConditionalAuthResult';
import { ClientSessionEndReason } from '../../classes/models/Client/ClientSessionEndReason';
import { ClientSignOutMode } from '../../classes/models/Client/ClientSignOutMode';
import { Token } from './../../classes/models/Token/Token';
import { Error } from './../../classes/types/Error';
interface IClientStateChangeListener {
    onClientSignedIn?(): void;
    onClientSignedOut?(reason: ClientSessionEndReason): void;
}
declare class ClientModule extends Module {
    private static _instance;
    private listener;
    static instance(): ClientModule;
    private constructor();
    private configureListeners;
    private configureClientSignedInListener;
    private configureClientSignedOutListener;
    private onClientSignedIn;
    private onClientSignedOut;
    /**
     * This method sets callbacks for a customer’s state changes.
     *
     * @param listener An object that implements the `IClientStateChangeListener` interface
     */
    setClientStateChangeListener(listener: IClientStateChangeListener): void;
    /**
     * This method registers a new customer with an email, password, and optional data.
     *
     * @param context `ClientAccountRegisterContext` object with client's email, password, and other optional data. Fields that are not provided are not modified
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    registerAccount(context: ClientAccountRegisterContext, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method confirms a customer account with the confirmation token.
     *
     * @param token Customer’s token provided by email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    confirmAccount(token: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method activates a customer with email.
     *
     * @param email Customer’s email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    activateAccount(email: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method requests a customer’s account registration process with the PIN code.
     *
     * @param email Customer’s email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    requestAccountActivationByPin(email: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method confirms a customer’s account registration process with the PIN code.
     *
     * @param pinCode Code sent to a customer’s email
     * @param email Customer’s email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    confirmAccountActivationByPin(pinCode: string, email: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method signs a customer in to obtain a JSON Web Token (JWT) which can be used in subsequent requests.
     *
     * @param email Customer’s email
     * @param password Customer’s password
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    signIn(email: string, password: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method signs a customer in to obtain a JSON Web Token (JWT) which can be used in subsequent requests.
     *
     * @param email Customer’s email
     * @param password Customer’s password
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    signInConditionally(email: string, password: string, onSuccess: (authResult: ClientConditionalAuthResult) => void, onError: (error: Error) => void): void;
    /**
     * This method authenticates a customer with OAuth, Facebook, Google, Apple, or Synerise.
     *
     * @param token Token retrieved from provider
     * @param provider Provider of your token
     * @param context `ClientAuthContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    authenticate(token: string, provider: ClientIdentityProvider, context: ClientAuthContext, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method authenticates a customer with OAuth, Facebook, Google, Apple, or Synerise.
     *
     * @param token Token retrieved from provider
     * @param provider Provider of your token
     * @param context `ClientAuthContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    authenticateConditionally(token: string, provider: ClientIdentityProvider, context: ClientAuthContext, onSuccess: (authResult: ClientConditionalAuthResult) => void, onError: (error: Error) => void): void;
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param accessToken OAuth Access Token
     * @param context `ClientOAuthAuthenticationContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticate(token:provider:context:onSuccess:onError)` method with `OAuth` provider instead.
     */
    authenticateByOAuth(accessToken: string, context: ClientOAuthAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param accessToken OAuth Access Token
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticateConditionally(token:provider:context:onSuccess:onError)` method with `OAuth` provider instead.
     */
    authenticateByOAuthIfRegistered(accessToken: string, authID: string | null, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param facebookToken Facebook Access Token
     * @param context `ClientFacebookAuthenticationContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticate(token:provider:context:onSuccess:onError)` method with `Facebook` provider instead.
     */
    authenticateByFacebook(facebookToken: string, context: ClientFacebookAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param facebookToken Facebook Access Token
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticateConditionally(token:provider:context:onSuccess:onError)` method with `Facebook` provider instead.
     */
    authenticateByFacebookIfRegistered(facebookToken: string, authID: string | null, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param identityToken Apple Identity Token
     * @param context `ClientAppleSignInAuthenticationContext` object with agreements and optional attributes
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticate(token:provider:context:onSuccess:onError)` method with `Apple` provider instead.
     */
    authenticateByAppleSignIn(identityToken: string, context: ClientAppleSignInAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method authenticates a customer with OAuth.
     *
     * @param identityToken Apple Identity Token
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.authenticateConditionally(token:provider:context:onSuccess:onError)` method with `Apple` provider instead.
     */
    authenticateByAppleSignInIfRegistered(identityToken: string, authID: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method checks if a customer is signed in (their token is authorized).
     *
     * @returns `true` if the customer is signed in, otherwise returns `false`
     */
    isSignedIn(): boolean;
    /**
     * This method signs out a customer and clears the customer’s JWT token.
     */
    signOut(): void;
    /**
     * This method signs out a customer and clears the customer’s JWT token.
     *
     * @param mode Logout mode
     * @param fromAllDevices Determines whether it should sign out all devices
     */
    signOutWithMode(mode: ClientSignOutMode, fromAllDevices: boolean, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method refreshes the customer’s current token.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    refreshToken(onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method retrieves the customer’s current, active token.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    retrieveToken(onSuccess: (token: Token) => void, onError: (error: Error) => void): void;
    /**
     * This method retrieves the customer’s current UUID.
     *
     * @returns the customer’s UUID as string.
     */
    getUUID(): string;
    /**
     * This method regenerates the UUID and clears the authentication token, login session, custom email, and custom identifier.
     */
    regenerateUUID(): void;
    /**
     * This method regenerates the UUID and clears the authentication token, login session, custom email, and custom identifier.
     *
     * @param clientIdentifier A seed for UUID generation
     */
    regenerateUUIDWithClientIdentifier(clientIdentifier: string): void;
    /**
     * This method destroys the whole session completely.
     */
    destroySession(): void;
    /**
     * This method gets a customer’s account information.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    getAccount(onSuccess: (clientAccountInformation: ClientAccountInformation) => void, onError: (error: Error) => void): void;
    /**
     * This method updates a customer’s account information.
     *
     * @param context Object with customer’s email, password, and other optional data
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    updateAccount(context: ClientAccountUpdateContext, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method requests a customer’s password reset with email.
     *
     * @param email Customer’s email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    requestPasswordReset(email: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method confirm a customer’s password reset with the new password and token provided by password reset request.
     *
     * @param password Customer’s new password
     * @param token Customer’s token provided in an email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    confirmPasswordReset(password: string, token: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method changes a customer’s password.
     *
     * @param oldPassword Customer’s new password
     * @param newPassword Customer’s old password
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    changePassword(oldPassword: string, newPassword: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method requests a customer’s email change.
     *
     * @param email Customer’s new email
     * @param password Customer’s password
     * @param externalToken Token retrieved from provider
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    requestEmailChange(email: string, password: string | null, externalToken: string | null, authID: string | null, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method confirms an email change.
     *
     * @param token Customer’s token provided in an email
     * @param newsletterAgreement Agreement for sending newsletters to the provided email
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    confirmEmailChange(token: string, newsletterAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * Requests a customer’s phone update. A confirmation code is sent to the phone number.
     *
     * @param phone Customer’s new phone number
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    requestPhoneUpdate(phone: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method confirms a phone number update. This action requires the new phone number and confirmation code as parameters.
     *
     * @param phone New phone number
     * @param confirmationCode A confirmation code received by a text message
     * @param smsAgreement Agreement for sending SMS to the provided number
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    confirmPhoneUpdate(phone: string, confirmationCode: string, smsAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method deletes a customer’s account.
     *
     * @param clientAuthFactor Token retrieved from provider
     * @param clientIdentityProvider Provider of your token
     * @param authID Optional identifier of authorization
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     */
    deleteAccountByIdentityProvider(clientAuthFactor: string, clientIdentityProvider: ClientIdentityProvider, authID: string | null, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method deletes a customer’s account.
     *
     * @param password Customer’s password
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError)` with `Synerise` provider method instead.
     */
    deleteAccount(password: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method deletes a customer’s account by OAuth.
     *
     * @param accessToken OAuth Access Token
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError)` method instead.
     */
    deleteAccountByOAuth(accessToken: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method deletes a customer’s account by Facebook.
     *
     * @param facebookToken Facebook Access Token
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     * @deprecated Use the new `Client.deleteAccountByIdentityProvider(clientAuthFactor:clientIdentityProvider:authID:onSuccess:onError)` method instead.
     */
    deleteAccountByFacebook(facebookToken: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method recognizes anonymous users and save personal information from their CRM entries.
     *
     * @param email Customer's email
     * @param customIdentify Customer's custom identifier
     * @param parameters Customer's custom parameters
     */
    recognizeAnonymous(email: string | null, customIdentify: string | null, parameters: Record<string, any> | null): void;
}
export { ClientModule, IClientStateChangeListener };
