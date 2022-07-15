"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ClientConditionalAuthStatus;
(function (ClientConditionalAuthStatus) {
    ClientConditionalAuthStatus["Success"] = "SUCCESS";
    ClientConditionalAuthStatus["Unauthorized"] = "UNAUTHORIZED";
    ClientConditionalAuthStatus["ActivationRequired"] = "ACTIVATION_REQUIRED";
    ClientConditionalAuthStatus["RegistrationRequired"] = "REGISTRATION_REQUIRED";
    ClientConditionalAuthStatus["ApprovalRequired"] = "APPROVAL_REQUIRED";
    ClientConditionalAuthStatus["TermsAcceptanceRequired"] = "TERMS_ACCEPTANCE_REQUIRED";
    ClientConditionalAuthStatus["MfaRequired"] = "MFA_REQUIRED";
})(ClientConditionalAuthStatus || (ClientConditionalAuthStatus = {}));
exports.ClientConditionalAuthStatus = ClientConditionalAuthStatus;
