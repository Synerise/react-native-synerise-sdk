package com.synerise.sdk.react.inapp.inline;

import androidx.annotation.Nullable;

import com.synerise.sdk.injector.inapp.ui.inline.InlineInAppView;

import java.util.Iterator;
import java.util.Map;
import java.util.Objects;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicLong;

public final class RNInlineInAppViewRegistry {

    private static final Map<String, RetainedInlineView> retainedViews = new HashMap<>();
    private static final AtomicLong idGenerator = new AtomicLong();

    private RNInlineInAppViewRegistry() {
    }

    public static String retain(String placementKey, InlineInAppView view) {
        synchronized (retainedViews) {
            releaseRetainedViewsForPlacementKey(placementKey);
            String viewId = "inline-" + idGenerator.incrementAndGet();
            retainedViews.put(viewId, new RetainedInlineView(placementKey, view));
            return viewId;
        }
    }

    @Nullable
    static InlineInAppView takeRetainedView(String viewId) {
        synchronized (retainedViews) {
            RetainedInlineView retained = retainedViews.remove(viewId);
            return retained != null ? retained.view : null;
        }
    }

    /**
     * A newer campaign for the same placement supersedes anything still waiting to be mounted,
     * so the older view is released rather than left holding a WebView forever.
     */
    private static void releaseRetainedViewsForPlacementKey(String placementKey) {
        Iterator<Map.Entry<String, RetainedInlineView>> entries = retainedViews.entrySet().iterator();
        while (entries.hasNext()) {
            RetainedInlineView retained = entries.next().getValue();
            if (Objects.equals(retained.placementKey, placementKey)) {
                entries.remove();
                retained.view.release();
            }
        }
    }

    private static final class RetainedInlineView {
        final String placementKey;
        final InlineInAppView view;

        RetainedInlineView(String placementKey, InlineInAppView view) {
            this.placementKey = placementKey;
            this.view = view;
        }
    }
}
