"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientIdentityProvider;
(function (ClientIdentityProvider) {
    ClientIdentityProvider["Synerise"] = "SYNERISE";
    ClientIdentityProvider["OAuth"] = "OAUTH";
    ClientIdentityProvider["Facebook"] = "FACEBOOK";
    ClientIdentityProvider["Apple"] = "APPLE";
    ClientIdentityProvider["Google"] = "GOOGLE";
    ClientIdentityProvider["Unknown"] = "UNKNOWN";
})(ClientIdentityProvider || (ClientIdentityProvider = {}));
exports.ClientIdentityProvider = ClientIdentityProvider;
function ClientIdentityProviderFromString(string) {
    if (string === ClientIdentityProvider.Synerise) {
        return ClientIdentityProvider.Synerise;
    }
    else if (string === ClientIdentityProvider.OAuth) {
        return ClientIdentityProvider.OAuth;
    }
    else if (string === ClientIdentityProvider.Facebook) {
        return ClientIdentityProvider.Facebook;
    }
    else if (string === ClientIdentityProvider.Apple) {
        return ClientIdentityProvider.Apple;
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
