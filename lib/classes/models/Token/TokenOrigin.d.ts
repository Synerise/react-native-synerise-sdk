declare enum TokenOrigin {
    Unknown = "UNKNOWN",
    Synerise = "SYNERISE",
    Facebook = "FACEBOOK",
    Oauth = "OAUTH",
    Apple = "APPLE"
}
declare function TokenOriginFromString(string: string): TokenOrigin;
declare function TokenOriginToString(origin: TokenOrigin): string;
export { TokenOrigin, TokenOriginFromString, TokenOriginToString };
