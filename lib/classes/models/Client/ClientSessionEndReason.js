"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientSessionEndReason;
(function (ClientSessionEndReason) {
    ClientSessionEndReason["NotSpecified"] = "NOT_SPECIFIED";
    ClientSessionEndReason["SessionExpiration"] = "SESSION_EXPIRATION";
    ClientSessionEndReason["SecurityException"] = "SECURITY_EXCEPTION";
    ClientSessionEndReason["UserSignOut"] = "USER_SIGN_OUT";
    ClientSessionEndReason["SystemSignOut"] = "SYSTEM_SIGN_OUT";
    ClientSessionEndReason["SessionDestroyed"] = "SESSION_DESTROYED";
    ClientSessionEndReason["ClientRejected"] = "CLIENT_REJECTED";
    ClientSessionEndReason["UserAccountDeleted"] = "USER_ACCOUNT_DELETED";
})(ClientSessionEndReason || (ClientSessionEndReason = {}));
exports.ClientSessionEndReason = ClientSessionEndReason;
function ClientSessionEndReasonFromString(string) {
    if (string === ClientSessionEndReason.SessionExpiration) {
        return ClientSessionEndReason.SessionExpiration;
    }
    else if (string === ClientSessionEndReason.SecurityException) {
        return ClientSessionEndReason.SecurityException;
    }
    else if (string === ClientSessionEndReason.UserSignOut) {
        return ClientSessionEndReason.UserSignOut;
    }
    else if (string === ClientSessionEndReason.SystemSignOut) {
        return ClientSessionEndReason.SystemSignOut;
    }
    else if (string === ClientSessionEndReason.SessionDestroyed) {
        return ClientSessionEndReason.SessionDestroyed;
    }
    else if (string === ClientSessionEndReason.ClientRejected) {
        return ClientSessionEndReason.ClientRejected;
    }
    else if (string === ClientSessionEndReason.UserAccountDeleted) {
        return ClientSessionEndReason.UserAccountDeleted;
    }
    return ClientSessionEndReason.NotSpecified;
}
exports.ClientSessionEndReasonFromString = ClientSessionEndReasonFromString;
function ClientSessionEndReasonToString(reason) {
    return reason;
}
exports.ClientSessionEndReasonToString = ClientSessionEndReasonToString;
