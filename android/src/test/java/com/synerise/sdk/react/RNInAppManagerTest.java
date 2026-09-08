package com.synerise.sdk.react;

import static org.junit.Assert.assertArrayEquals;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertTrue;

import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.DynamicFromObject;
import com.facebook.react.bridge.JavaOnlyArray;
import com.facebook.react.bridge.JavaOnlyMap;
import com.synerise.sdk.injector.inapp.InAppCustomMethodCompletion;

import org.junit.Before;
import org.junit.Test;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Covers the pure, JVM-reachable logic of RNInAppManager: resolving a pending custom-method completion
 * by call id for both the overlay and the inline path, including the conversion of the JS result. The
 * result crosses the bridge as `Dynamic`, so a creative may receive a string, number, boolean, array,
 * object or null — the same set iOS delivers (regression guard for the 1.10.0 behaviour lost in a
 * merge). The two static registries are seeded/inspected via reflection, exactly as the wire populates
 * them at runtime. Nothing here touches native Arguments or the static Injector singleton, so it runs
 * on a plain JVM.
 */
public class RNInAppManagerTest {

    private static class RecordingCompletion implements InAppCustomMethodCompletion {
        boolean successCalled;
        Object successResult;
        boolean failureCalled;
        String failureMessage;
        int failureCallCount;

        @Override
        public void success(Object result) {
            successCalled = true;
            successResult = result;
        }

        @Override
        public void failure(String errorMessage) {
            failureCalled = true;
            failureMessage = errorMessage;
            failureCallCount++;
        }
    }

    private RNInAppManager inAppManager;

    @Before
    public void setUp() {
        inAppManager = new RNInAppManager(null);
        pendingInlineCompletions().clear();
        pendingInAppCompletions().clear();
    }

    @SuppressWarnings("unchecked")
    private static ConcurrentHashMap<String, InAppCustomMethodCompletion> pendingInlineCompletions() {
        return (ConcurrentHashMap<String, InAppCustomMethodCompletion>) staticMap("pendingInlineCustomMethodCompletions");
    }

    @SuppressWarnings("unchecked")
    private static ConcurrentHashMap<String, InAppCustomMethodCompletion> pendingInAppCompletions() {
        return (ConcurrentHashMap<String, InAppCustomMethodCompletion>) staticMap("pendingInAppCustomMethodCompletions");
    }

    private static ConcurrentHashMap<?, ?> staticMap(String fieldName) {
        try {
            Field field = RNInAppManager.class.getDeclaredField(fieldName);
            field.setAccessible(true);
            return (ConcurrentHashMap<?, ?>) field.get(null);
        } catch (Exception exception) {
            throw new RuntimeException(exception);
        }
    }

    private static Dynamic dynamic(Object value) {
        return new DynamicFromObject(value);
    }

    // ---- inline

    @Test
    public void resolveInlineCustomMethod_givenObjectResult_shouldPassConvertedMapToCompletionAndRemoveIt() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInlineCompletions().put("call-1", completion);
        JavaOnlyMap result = new JavaOnlyMap();
        result.putString("status", "ok");

        inAppManager.resolveInlineCustomMethod("call-1", true, dynamic(result), null);

        assertTrue(completion.successCalled);
        assertTrue(completion.successResult instanceof Map);
        assertEquals("ok", ((Map<?, ?>) completion.successResult).get("status"));
        assertFalse(pendingInlineCompletions().containsKey("call-1"));
    }

    @Test
    public void resolveInlineCustomMethod_givenNullDynamic_shouldPassNullToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInlineCompletions().put("call-2", completion);

        inAppManager.resolveInlineCustomMethod("call-2", true, null, null);

        assertTrue(completion.successCalled);
        assertNull(completion.successResult);
    }

    @Test
    public void resolveInlineCustomMethod_givenJsNull_shouldPassNullToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInlineCompletions().put("call-2b", completion);

        inAppManager.resolveInlineCustomMethod("call-2b", true, dynamic(null), null);

        assertTrue(completion.successCalled);
        assertNull(completion.successResult);
    }

    @Test
    public void resolveInlineCustomMethod_givenFailure_shouldPassErrorMessageToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInlineCompletions().put("call-3", completion);

        inAppManager.resolveInlineCustomMethod("call-3", false, null, "BOOM");

        assertTrue(completion.failureCalled);
        assertEquals("BOOM", completion.failureMessage);
        assertFalse(completion.successCalled);
    }

    @Test
    public void resolveInlineCustomMethod_givenFailureWithoutMessage_shouldFallBackToUnknownError() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInlineCompletions().put("call-3b", completion);

        inAppManager.resolveInlineCustomMethod("call-3b", false, null, null);

        assertTrue(completion.failureCalled);
        assertEquals("Unknown error.", completion.failureMessage);
    }

    @Test
    public void resolveInlineCustomMethod_givenUnknownCallId_shouldDoNothing() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInlineCompletions().put("known", completion);

        inAppManager.resolveInlineCustomMethod("unknown", true, null, null);

        assertFalse(completion.successCalled);
        assertFalse(completion.failureCalled);
        assertTrue(pendingInlineCompletions().containsKey("known"));
    }

    @Test
    public void resolveInlineCustomMethod_calledTwiceForSameCallId_shouldResolveOnlyOnce() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInlineCompletions().put("call-4", completion);

        inAppManager.resolveInlineCustomMethod("call-4", false, null, "FIRST");
        inAppManager.resolveInlineCustomMethod("call-4", false, null, "SECOND");

        assertEquals(1, completion.failureCallCount);
        assertEquals("FIRST", completion.failureMessage);
    }

    // ---- overlay, non-object results (1.10.0 contract, same as iOS)

    @Test
    public void resolveInAppCustomMethod_givenStringResult_shouldPassStringToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInAppCompletions().put("call-5", completion);

        inAppManager.resolveInAppCustomMethod("call-5", true, dynamic("plain string result"), null);

        assertEquals("plain string result", completion.successResult);
        assertFalse(pendingInAppCompletions().containsKey("call-5"));
    }

    @Test
    public void resolveInAppCustomMethod_givenNumberResult_shouldPassDoubleToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInAppCompletions().put("call-6", completion);

        inAppManager.resolveInAppCustomMethod("call-6", true, dynamic(42.5), null);

        assertEquals(42.5, completion.successResult);
    }

    @Test
    public void resolveInAppCustomMethod_givenBooleanResult_shouldPassBooleanToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInAppCompletions().put("call-7", completion);

        inAppManager.resolveInAppCustomMethod("call-7", true, dynamic(true), null);

        assertEquals(Boolean.TRUE, completion.successResult);
    }

    @Test
    public void resolveInAppCustomMethod_givenArrayResult_shouldPassConvertedArrayToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInAppCompletions().put("call-8", completion);
        JavaOnlyArray result = new JavaOnlyArray();
        result.pushString("first");
        result.pushDouble(2);
        result.pushBoolean(true);

        inAppManager.resolveInAppCustomMethod("call-8", true, dynamic(result), null);

        assertTrue(completion.successResult instanceof Object[]);
        assertArrayEquals(new Object[]{"first", 2.0, true}, (Object[]) completion.successResult);
    }

    @Test
    public void resolveInAppCustomMethod_givenObjectResult_shouldPassConvertedMapToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInAppCompletions().put("call-9", completion);
        JavaOnlyMap nested = new JavaOnlyMap();
        nested.putInt("level", 2);
        JavaOnlyMap result = new JavaOnlyMap();
        result.putString("status", "ok");
        result.putMap("nested", nested);

        inAppManager.resolveInAppCustomMethod("call-9", true, dynamic(result), null);

        assertTrue(completion.successResult instanceof Map);
        assertEquals("ok", ((Map<?, ?>) completion.successResult).get("status"));
        assertTrue(((Map<?, ?>) completion.successResult).get("nested") instanceof Map);
    }

    @Test
    public void resolveInAppCustomMethod_givenJsNull_shouldPassNullToCompletion() {
        RecordingCompletion completion = new RecordingCompletion();
        pendingInAppCompletions().put("call-10", completion);

        inAppManager.resolveInAppCustomMethod("call-10", true, dynamic(null), null);

        assertTrue(completion.successCalled);
        assertNull(completion.successResult);
    }

    @Test
    public void resolveInAppCustomMethod_shouldNotTouchTheInlineRegistry() {
        RecordingCompletion inline = new RecordingCompletion();
        RecordingCompletion overlay = new RecordingCompletion();
        pendingInlineCompletions().put("same-id", inline);
        pendingInAppCompletions().put("same-id", overlay);

        inAppManager.resolveInAppCustomMethod("same-id", true, dynamic("x"), null);

        assertTrue(overlay.successCalled);
        assertFalse(inline.successCalled);
        assertTrue(pendingInlineCompletions().containsKey("same-id"));
    }
}
