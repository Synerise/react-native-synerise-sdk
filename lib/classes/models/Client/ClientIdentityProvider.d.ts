declare enum ClientIdentityProvider {
    Synerise = "SYNERISE",
    OAuth = "OAUTH",
    Facebook = "FACEBOOK",
    Apple = "APPLE",
    Google = "GOOGLE",
    Unknown = "UNKNOWN"
}
declare function ClientIdentityProviderFromString(string: string): ClientIdentityProvider;
declare function ClientIdentityProviderToString(clientIdentityProvider: ClientIdentityProvider): string;
export { ClientIdentityProvider, ClientIdentityProviderFromString, ClientIdentityProviderToString };
