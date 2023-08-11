"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientIdentityProvider;
(function (ClientIdentityProvider) {
    ClientIdentityProvider["Unknown"] = "UNKNOWN";
    ClientIdentityProvider["Synerise"] = "SYNERISE";
    ClientIdentityProvider["Oauth"] = "OAUTH";
    ClientIdentityProvider["Facebook"] = "FACEBOOK";
    ClientIdentityProvider["Google"] = "GOOGLE";
})(ClientIdentityProvider || (ClientIdentityProvider = {}));
exports.ClientIdentityProvider = ClientIdentityProvider;
function ClientIdentityProviderFromString(string) {
    if (string === ClientIdentityProvider.Synerise) {
        return ClientIdentityProvider.Synerise;
    }
    else if (string === ClientIdentityProvider.Oauth) {
        return ClientIdentityProvider.Oauth;
    }
    else if (string === ClientIdentityProvider.Facebook) {
        return ClientIdentityProvider.Facebook;
    }
    else if (string === ClientIdentityProvider.Google) {
        return ClientIdentityProvider.Google;
    }
    return ClientIdentityProvider.Unknown;
}
exports.ClientIdentityProviderFromString = ClientIdentityProviderFromString;
function ClientIdentityProviderToString(clientIdentityProvider) {
    return clientIdentityProvider;
}
exports.ClientIdentityProviderToString = ClientIdentityProviderToString;
