declare enum ClientSignOutMode {
    SignOut = "SIGN_OUT",
    SignOutWithSessionDestroy = "SIGN_OUT_WITH_SESSION_DESTROY"
}
declare function ClientSignOutModeToString(mode: ClientSignOutMode): string;
export { ClientSignOutMode, ClientSignOutModeToString };
