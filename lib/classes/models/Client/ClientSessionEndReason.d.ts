declare enum ClientSessionEndReason {
    NotSpecified = "NOT_SPECIFIED",
    SessionExpiration = "SESSION_EXPIRATION",
    SecurityException = "SECURITY_EXCEPTION",
    UserSignOut = "USER_SIGN_OUT",
    SystemSignOut = "SYSTEM_SIGN_OUT",
    SessionDestroyed = "SESSION_DESTROYED",
    ClientRejected = "CLIENT_REJECTED",
    UserAccountDeleted = "USER_ACCOUNT_DELETED"
}
declare function ClientSessionEndReasonFromString(string: string): ClientSessionEndReason;
declare function ClientSessionEndReasonToString(reason: ClientSessionEndReason): string;
export { ClientSessionEndReason, ClientSessionEndReasonFromString, ClientSessionEndReasonToString };
