declare enum TokenOrigin {
    Unknown = "UNKNOWN",
    Synerise = "SYNERISE",
    Facebook = "FACEBOOK",
    Oauth = "OAUTH"
}
declare function TokenOriginFromString(string: string): TokenOrigin;
declare function TokenOriginToString(tokenOrigin: TokenOrigin): string;
export { TokenOrigin, TokenOriginFromString, TokenOriginToString };
