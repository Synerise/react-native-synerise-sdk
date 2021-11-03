"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenOriginToString = exports.TokenOriginFromString = exports.TokenOrigin = void 0;
var TokenOrigin;
(function (TokenOrigin) {
    TokenOrigin["Unknown"] = "UNKNOWN";
    TokenOrigin["Synerise"] = "SYNERISE";
    TokenOrigin["Facebook"] = "FACEBOOK";
    TokenOrigin["Oauth"] = "OAUTH";
})(TokenOrigin || (TokenOrigin = {}));
exports.TokenOrigin = TokenOrigin;
function TokenOriginFromString(string) {
    if (string === TokenOrigin.Synerise) {
        return TokenOrigin.Synerise;
    }
    else if (string === TokenOrigin.Facebook) {
        return TokenOrigin.Facebook;
    }
    else if (string === TokenOrigin.Oauth) {
        return TokenOrigin.Oauth;
    }
    return TokenOrigin.Unknown;
}
exports.TokenOriginFromString = TokenOriginFromString;
function TokenOriginToString(tokenOrigin) {
    return tokenOrigin;
}
exports.TokenOriginToString = TokenOriginToString;
