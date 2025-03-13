"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenOriginToString = exports.TokenOriginFromString = exports.TokenOrigin = void 0;
var TokenOrigin;
(function (TokenOrigin) {
    TokenOrigin["Unknown"] = "UNKNOWN";
    TokenOrigin["Anonymous"] = "ANONYMOUS";
    TokenOrigin["Synerise"] = "SYNERISE";
    TokenOrigin["Oauth"] = "OAUTH";
    TokenOrigin["SimpleAuth"] = "SIMPLE_AUTH";
    TokenOrigin["Facebook"] = "FACEBOOK";
    TokenOrigin["Google"] = "GOOGLE";
    TokenOrigin["Apple"] = "APPLE";
})(TokenOrigin || (TokenOrigin = {}));
exports.TokenOrigin = TokenOrigin;
function TokenOriginFromString(string) {
    if (string === TokenOrigin.Anonymous) {
        return TokenOrigin.Anonymous;
    }
    else if (string === TokenOrigin.Synerise) {
        return TokenOrigin.Synerise;
    }
    else if (string === TokenOrigin.Oauth) {
        return TokenOrigin.Oauth;
    }
    else if (string === TokenOrigin.SimpleAuth) {
        return TokenOrigin.SimpleAuth;
    }
    else if (string === TokenOrigin.Facebook) {
        return TokenOrigin.Facebook;
    }
    else if (string === TokenOrigin.Google) {
        return TokenOrigin.Google;
    }
    else if (string === TokenOrigin.Apple) {
        return TokenOrigin.Apple;
    }
    return TokenOrigin.Unknown;
}
exports.TokenOriginFromString = TokenOriginFromString;
function TokenOriginToString(origin) {
    return origin;
}
exports.TokenOriginToString = TokenOriginToString;
