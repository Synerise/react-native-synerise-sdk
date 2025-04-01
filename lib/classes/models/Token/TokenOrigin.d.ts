declare enum TokenOrigin {
    Unknown = "UNKNOWN",
    Anonymous = "ANONYMOUS",
    Synerise = "SYNERISE",
    OAuth = "OAUTH",
    SimpleAuth = "SIMPLE_AUTH",
    Facebook = "FACEBOOK",
    Google = "GOOGLE",
    Apple = "APPLE"
}
declare function TokenOriginFromString(string: string): TokenOrigin;
declare function TokenOriginToString(origin: TokenOrigin): string;
export { TokenOrigin, TokenOriginFromString, TokenOriginToString };
