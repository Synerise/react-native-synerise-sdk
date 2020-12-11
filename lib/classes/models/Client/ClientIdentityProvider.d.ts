declare enum ClientIdentityProvider {
    Facebook = "FACEBOOK",
    Google = "GOOGLE",
    Oauth = "OAUTH",
    Synerise = "SYNERISE",
    Unknown = "UNKNOWN"
}
declare function ClientIdentityProviderFromString(string: string): ClientIdentityProvider;
declare function ClientIdentityProviderToString(clientIdentityProvider: ClientIdentityProvider): string;
export { ClientIdentityProvider, ClientIdentityProviderFromString, ClientIdentityProviderToString };
