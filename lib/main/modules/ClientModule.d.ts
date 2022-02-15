import { BaseModule as Module } from './BaseModule';
import { ClientAccountRegisterContext } from './../../classes/models/Client/ClientAccountRegisterContext';
import { ClientAccountUpdateContext } from './../../classes/models/Client/ClientAccountUpdateContext';
import { ClientAccountInformation } from './../../classes/models/Client/ClientAccountInformation';
import { ClientAuthContext } from '../../classes/models/Client/ClientAuthContext';
import { ClientOAuthAuthenticationContext } from '../../classes/models/Client/ClientOAuthAuthenticationContext';
import { ClientFacebookAuthenticationContext } from '../../classes/models/Client/ClientFacebookAuthenticationContext';
import { ClientAppleSignInAuthenticationContext } from '../../classes/models/Client/ClientAppleSignInAuthenticationContext';
import { ClientIdentityProvider } from '../../classes/models/Client/ClientIdentityProvider';
import { ClientSessionEndReason } from '../../classes/models/Client/ClientSessionEndReason';
import { ClientConditionalAuthResult } from '../../classes/models/Client/ClientConditionalAuthResult';
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
    setClientStateChangeListener(listener: IClientStateChangeListener): void;
    registerAccount(context: ClientAccountRegisterContext, onSuccess: () => void, onError: (error: Error) => void): void;
    confirmAccount(token: string, onSuccess: () => void, onError: (error: Error) => void): void;
    activateAccount(email: string, onSuccess: () => void, onError: (error: Error) => void): void;
    signIn(email: string, password: string, onSuccess: () => void, onError: (error: Error) => void): void;
    signInConditionally(email: string, password: string, onSuccess: (authResult: ClientConditionalAuthResult) => void, onError: (error: Error) => void): void;
    authenticate(token: string, provider: ClientIdentityProvider, context: ClientAuthContext, onSuccess: () => void, onError: (error: Error) => void): void;
    authenticateConditionally(token: string, provider: ClientIdentityProvider, context: ClientAuthContext, onSuccess: (authResult: ClientConditionalAuthResult) => void, onError: (error: Error) => void): void;
    /**
     * @deprecated please use authenticate method with OAuth provider instead
     */
    authenticateByOAuth(accessToken: string, context: ClientOAuthAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * @deprecated please use authenticateConditionally method with OAuth provider instead
     */
    authenticateByOAuthIfRegistered(accessToken: string, authID: string | null, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * @deprecated please use authenticate method with Facebook provider instead
     */
    authenticateByFacebook(facebookToken: string, context: ClientFacebookAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * @deprecated please use authenticateConditionally method with Facebook provider instead
     */
    authenticateByFacebookIfRegistered(facebookToken: string, authID: string | null, onSuccess: () => void, onError: (error: Error) => void): void;
    authenticateByAppleSignIn(identityToken: string, context: ClientAppleSignInAuthenticationContext, onSuccess: () => void, onError: (error: Error) => void): void;
    authenticateByAppleSignInIfRegistered(identityToken: string, authID: string, onSuccess: () => void, onError: (error: Error) => void): void;
    isSignedIn(): boolean;
    signOut(): void;
    refreshToken(onSuccess: () => void, onError: (error: Error) => void): void;
    retrieveToken(onSuccess: (token: Token) => void, onError: (error: Error) => void): void;
    getUUID(): string;
    regenerateUUID(): void;
    regenerateUUIDWithClientIdentifier(clientIdentifier: string): void;
    destroySession(): void;
    getAccount(onSuccess: (clientAccountInformation: ClientAccountInformation) => void, onError: (error: Error) => void): void;
    updateAccount(context: ClientAccountUpdateContext, onSuccess: () => void, onError: (error: Error) => void): void;
    requestPasswordReset(email: string, onSuccess: () => void, onError: (error: Error) => void): void;
    confirmPasswordReset(password: string, token: string, onSuccess: () => void, onError: (error: Error) => void): void;
    changePassword(oldPassword: string, newPassword: string, onSuccess: () => void, onError: (error: Error) => void): void;
    requestEmailChange(email: string, password: string | null, externalToken: string | null, authID: string | null, onSuccess: () => void, onError: (error: Error) => void): void;
    confirmEmailChange(token: string, newsletterAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void): void;
    requestPhoneUpdate(phone: string, onSuccess: () => void, onError: (error: Error) => void): void;
    confirmPhoneUpdate(phone: string, confirmationCode: string, smsAgreement: Boolean, onSuccess: () => void, onError: (error: Error) => void): void;
    requestAccountActivationByPin(email: string, onSuccess: () => void, onError: (error: Error) => void): void;
    confirmAccountActivationByPin(pinCode: string, email: string, onSuccess: () => void, onError: (error: Error) => void): void;
    deleteAccountByIdentityProvider(clientAuthFactor: string, clientIdentityProvider: ClientIdentityProvider, authID: string | null, onSuccess: () => void, onError: (error: Error) => void): void;
    deleteAccount(password: string, onSuccess: () => void, onError: (error: Error) => void): void;
    deleteAccountByOAuth(accessToken: string, onSuccess: () => void, onError: (error: Error) => void): void;
    deleteAccountByFacebook(facebookToken: string, onSuccess: () => void, onError: (error: Error) => void): void;
    recognizeAnonymous(email: string | null, customIdentify: string | null, parameters: Record<string, any> | null): void;
}
export { ClientModule, IClientStateChangeListener };
