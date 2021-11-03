declare enum ClientConditionalAuthStatus {
    Success = "SUCCESS",
    Unauthorized = "UNAUTHORIZED",
    ActivationRequired = "ACTIVATION_REQUIRED",
    RegistrationRequired = "REGISTRATION_REQUIRED",
    ApprovalRequired = "APPROVAL_REQUIRED",
    TermsAcceptanceRequired = "TERMS_ACCEPTANCE_REQUIRED",
    MfaRequired = "MFA_REQUIRED"
}
export { ClientConditionalAuthStatus };
