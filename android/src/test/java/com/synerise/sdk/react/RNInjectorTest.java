package com.synerise.sdk.react;

import static org.junit.Assert.assertEquals;

import org.junit.Before;
import org.junit.Test;

import java.util.Map;

/**
 * Exercises the pure, non-native part of RNInjector: the getConstants() key contract that JS relies
 * on. Every key/value pair here is a public contract with the JS layer; a rename or drop silently
 * breaks event routing on the JS side, so the whole map is asserted exhaustively.
 * The in-app pending-completion / context-request logic moved to RNInAppManager and is covered by
 * RNInAppManagerTest.
 */
public class RNInjectorTest {

    private RNInjector injector;

    @Before
    public void setUp() {
        injector = new RNInjector(null);
    }

    @Test
    public void getConstants_shouldExposeEveryListenerKeyThatJsDependsOn() {
        Map<String, Object> constants = injector.getConstants();

        assertEquals(13, constants.size());
        assertEquals("openUrl", constants.get("URL_ACTION_LISTENER_KEY"));
        assertEquals("deepLink", constants.get("DEEPLINK_ACTION_LISTENER_KEY"));
        assertEquals("inAppPresented", constants.get("IN_APP_MESSAGE_PRESENTED_LISTENER_KEY"));
        assertEquals("inAppHidden", constants.get("IN_APP_MESSAGE_HIDDEN_LISTENER_KEY"));
        assertEquals("inAppUrlAction", constants.get("IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY"));
        assertEquals("inAppDeepLinkAction", constants.get("IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY"));
        assertEquals("inAppCustomAction", constants.get("IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY"));
        assertEquals("inlineInAppUrlAction", constants.get("INLINE_IN_APP_MESSAGE_URL_ACTION_LISTENER_KEY"));
        assertEquals("inlineInAppDeepLinkAction", constants.get("INLINE_IN_APP_MESSAGE_DEEPLINK_ACTION_LISTENER_KEY"));
        assertEquals("inlineInAppCustomAction", constants.get("INLINE_IN_APP_MESSAGE_CUSTOM_ACTION_LISTENER_KEY"));
        assertEquals("inlineInAppCustomMethod", constants.get("INLINE_IN_APP_MESSAGE_CUSTOM_METHOD_LISTENER_KEY"));
        assertEquals("inlineInAppAvailable", constants.get("INLINE_IN_APP_MESSAGE_AVAILABLE_LISTENER_KEY"));
        assertEquals("inlineInAppContextRequired", constants.get("INLINE_IN_APP_MESSAGE_CONTEXT_REQUIRED_LISTENER_KEY"));
    }
}
