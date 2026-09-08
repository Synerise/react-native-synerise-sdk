declare enum SyneriseSource {
    NotSpecified = "NOT_SPECIFIED",
    SimplePush = "SIMPLE_PUSH",
    InAppMessage = "IN_APP_MESSAGE",
    InlineInAppMessage = "INLINE_IN_APP_MESSAGE"
}
declare function SyneriseSourceFromString(string: string): SyneriseSource;
declare function SyneriseSourceToString(source: SyneriseSource): string;
export { SyneriseSource, SyneriseSourceFromString, SyneriseSourceToString };
