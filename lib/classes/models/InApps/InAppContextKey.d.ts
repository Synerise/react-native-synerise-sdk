/**
 * Well-known keys of `Synerise.Injector.inAppContext`.
 *
 * `JinjavaContext` is the only part of the context sent to the backend for server-side Jinja
 * evaluation when a campaign is rendered. It may hold a nested object; its size is validated
 * server-side.
 */
declare enum InAppContextKey {
    JinjavaContext = "jinjavaContext"
}
export { InAppContextKey };
