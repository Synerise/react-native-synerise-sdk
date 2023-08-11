declare enum ClientIdentityProvider {
    Unknown = "UNKNOWN",
    Synerise = "SYNERISE",
    Oauth = "OAUTH",
    Facebook = "FACEBOOK",
    Google = "GOOGLE"
}
declare function ClientIdentityProviderFromString(string: string): ClientIdentityProvider;
declare function ClientIdentityProviderToString(clientIdentityProvider: ClientIdentityProvider): string;
export { ClientIdentityProvider, ClientIdentityProviderFromString, ClientIdentityProviderToString };
