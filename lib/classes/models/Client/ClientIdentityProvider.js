"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientIdentityProviderToString = exports.ClientIdentityProviderFromString = exports.ClientIdentityProvider = void 0;
var ClientIdentityProvider;
(function (ClientIdentityProvider) {
    ClientIdentityProvider["Facebook"] = "FACEBOOK";
    ClientIdentityProvider["Google"] = "GOOGLE";
    ClientIdentityProvider["Oauth"] = "OAUTH";
    ClientIdentityProvider["Synerise"] = "SYNERISE";
    ClientIdentityProvider["Unknown"] = "UNKNOWN";
})(ClientIdentityProvider || (ClientIdentityProvider = {}));
exports.ClientIdentityProvider = ClientIdentityProvider;
function ClientIdentityProviderFromString(string) {
    if (string === ClientIdentityProvider.Facebook) {
        return ClientIdentityProvider.Facebook;
    }
    else if (string === ClientIdentityProvider.Google) {
        return ClientIdentityProvider.Google;
    }
    else if (string === ClientIdentityProvider.Oauth) {
        return ClientIdentityProvider.Oauth;
    }
    else if (string === ClientIdentityProvider.Synerise) {
        return ClientIdentityProvider.Synerise;
    }
    return ClientIdentityProvider.Unknown;
}
exports.ClientIdentityProviderFromString = ClientIdentityProviderFromString;
function ClientIdentityProviderToString(clientIdentityProvider) {
    return clientIdentityProvider;
}
exports.ClientIdentityProviderToString = ClientIdentityProviderToString;
