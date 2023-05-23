"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientSignOutMode;
(function (ClientSignOutMode) {
    ClientSignOutMode["SignOut"] = "SIGN_OUT";
    ClientSignOutMode["SignOutWithSessionDestroy"] = "SIGN_OUT_WITH_SESSION_DESTROY";
})(ClientSignOutMode || (ClientSignOutMode = {}));
exports.ClientSignOutMode = ClientSignOutMode;
function ClientSignOutModeToString(mode) {
    return mode;
}
exports.ClientSignOutModeToString = ClientSignOutModeToString;
