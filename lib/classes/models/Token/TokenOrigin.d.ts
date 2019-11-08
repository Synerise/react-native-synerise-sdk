declare enum TokenOrigin {
    Unknown = "UNKNOWN",
    Synerise = "SYNERISE",
    Facebook = "FACEBOOK",
    Oauth = "OAUTH"
}
declare function TokenOriginFromString(string: String): TokenOrigin;
declare function TokenOriginToString(tokenOrigin: TokenOrigin): String;
export { TokenOrigin, TokenOriginFromString, TokenOriginToString };
