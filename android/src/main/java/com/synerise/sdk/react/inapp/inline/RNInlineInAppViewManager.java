package com.synerise.sdk.react.inapp.inline;

import android.view.View;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.synerise.sdk.injector.inapp.inline.InlineInAppMessageData;
import com.synerise.sdk.injector.inapp.inline.InlineInAppSize;
import com.synerise.sdk.injector.inapp.inline.OnInlineInAppViewListener;
import com.synerise.sdk.injector.inapp.ui.inline.InlineInAppView;
import com.synerise.sdk.react.utils.MapUtil;

import java.util.Map;

public class RNInlineInAppViewManager extends ViewGroupManager<RNInlineInAppContainer> {

    private static final String NAME = "RNInlineInAppView";

    private static final String COMMAND_RENDER_NAME = "render";
    private static final String COMMAND_RELEASE_NAME = "release";
    private static final int COMMAND_RENDER_ID = 1;
    private static final int COMMAND_RELEASE_ID = 2;

    private static final String CALLBACK_LOADED = "onLoaded";
    private static final String CALLBACK_UPDATED = "onUpdated";
    private static final String CALLBACK_FAILED = "onFailed";
    private static final String CALLBACK_REMOVE = "onRemove";
    private static final String CALLBACK_SIZE_CHANGED = "onSizeChanged";
    private static final String CALLBACK_PROCESSING_STARTED = "onProcessingStarted";

    @NonNull
    @Override
    public String getName() {
        return NAME;
    }

    @NonNull
    @Override
    protected RNInlineInAppContainer createViewInstance(@NonNull ThemedReactContext context) {
        RNInlineInAppContainer container = new RNInlineInAppContainer(context);
        container.setOnInlineInAppViewListener(createViewListener(context, container));
        return container;
    }

    @ReactProp(name = "placementKey")
    public void setPlacementKey(RNInlineInAppContainer container, @Nullable String placementKey) {
        if (placementKey != null && container.hasAdoptedView() == false) {
            container.getInlineInAppView().setPlacementKey(placementKey);
        }
    }

    @ReactProp(name = "identifier")
    public void setIdentifier(RNInlineInAppContainer container, @Nullable String identifier) {
        container.getInlineInAppView().setIdentifier(identifier);
    }

    /**
     * Mounts the already-rendered view the SDK announced through the global listener instead of
     * rendering again; a stale id simply leaves the container's own view in place.
     */
    @ReactProp(name = "adoptViewId")
    public void setAdoptViewId(RNInlineInAppContainer container, @Nullable String adoptViewId) {
        if (adoptViewId == null) {
            return;
        }
        InlineInAppView retainedView = RNInlineInAppViewRegistry.takeRetainedView(adoptViewId);
        if (retainedView == null) {
            return;
        }
        container.adoptInlineInAppView(retainedView);
        applyPendingLayout(container);
    }

    @Nullable
    @Override
    public Map<String, Object> getExportedCustomDirectEventTypeConstants() {
        return MapBuilder.<String, Object>builder()
                .put(CALLBACK_LOADED, MapBuilder.of("registrationName", CALLBACK_LOADED))
                .put(CALLBACK_UPDATED, MapBuilder.of("registrationName", CALLBACK_UPDATED))
                .put(CALLBACK_FAILED, MapBuilder.of("registrationName", CALLBACK_FAILED))
                .put(CALLBACK_REMOVE, MapBuilder.of("registrationName", CALLBACK_REMOVE))
                .put(CALLBACK_SIZE_CHANGED, MapBuilder.of("registrationName", CALLBACK_SIZE_CHANGED))
                .put(CALLBACK_PROCESSING_STARTED, MapBuilder.of("registrationName", CALLBACK_PROCESSING_STARTED))
                .build();
    }

    @Nullable
    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of(COMMAND_RENDER_NAME, COMMAND_RENDER_ID, COMMAND_RELEASE_NAME, COMMAND_RELEASE_ID);
    }

    @Override
    public void receiveCommand(@NonNull RNInlineInAppContainer container, int commandId, @Nullable ReadableArray args) {
        if (commandId == COMMAND_RENDER_ID) {
            container.getInlineInAppView().render();
        } else if (commandId == COMMAND_RELEASE_ID) {
            container.getInlineInAppView().release();
        }
    }

    @Override
    public void receiveCommand(@NonNull RNInlineInAppContainer container, String commandId, @Nullable ReadableArray args) {
        if (COMMAND_RENDER_NAME.equals(commandId)) {
            container.getInlineInAppView().render();
        } else if (COMMAND_RELEASE_NAME.equals(commandId)) {
            container.getInlineInAppView().release();
        }
    }

    @Override
    public void onDropViewInstance(@NonNull RNInlineInAppContainer container) {
        container.releaseInlineInAppView();
        super.onDropViewInstance(container);
    }

    private OnInlineInAppViewListener createViewListener(ThemedReactContext context, RNInlineInAppContainer container) {
        return new OnInlineInAppViewListener() {
            @Override
            public void onProcessingStarted() {
                dispatchEvent(context, container, CALLBACK_PROCESSING_STARTED, Arguments.createMap());
            }

            @Override
            public void onLoaded(InlineInAppMessageData data) {
                applyPendingLayout(container);
                dispatchEvent(context, container, CALLBACK_LOADED, buildDataPayload(data));
            }

            @Override
            public void onUpdated(InlineInAppMessageData data) {
                applyPendingLayout(container);
                dispatchEvent(context, container, CALLBACK_UPDATED, buildDataPayload(data));
            }

            @Override
            public void onFailed(InlineInAppMessageData data, String error) {
                WritableMap payload = buildDataPayload(data);
                payload.putString("error", error);
                dispatchEvent(context, container, CALLBACK_FAILED, payload);
            }

            @Override
            public void onRemove(InlineInAppMessageData data) {
                dispatchEvent(context, container, CALLBACK_REMOVE, buildDataPayload(data));
            }

            @Override
            public void onSizeChanged(InlineInAppMessageData data, InlineInAppSize size) {
                WritableMap payload = buildDataPayload(data);
                payload.putInt("widthPx", size.getWidthPx());
                payload.putInt("heightPx", size.getHeightPx());
                payload.putDouble("width", size.getWidthDp());
                payload.putDouble("height", size.getHeightDp());
                payload.putDouble("widthScreenRatio", size.getWidthScreenRatio());
                payload.putDouble("heightScreenRatio", size.getHeightScreenRatio());
                applyPendingLayout(container);
                dispatchEvent(context, container, CALLBACK_SIZE_CHANGED, payload);
            }
        };
    }

    /**
     * React Native does not re-measure children added after its layout pass; the SDK attaches the
     * campaign WebView asynchronously (on load), so it stays at 0x0 until we force a measure+layout.
     */
    private void applyPendingLayout(RNInlineInAppContainer container) {
        container.post(() -> {
            container.measure(
                    View.MeasureSpec.makeMeasureSpec(container.getWidth(), View.MeasureSpec.EXACTLY),
                    View.MeasureSpec.makeMeasureSpec(container.getHeight(), View.MeasureSpec.EXACTLY));
            container.layout(container.getLeft(), container.getTop(), container.getRight(), container.getBottom());
        });
    }

    private void dispatchEvent(ThemedReactContext context, RNInlineInAppContainer container, String eventName, WritableMap payload) {
        context.getJSModule(RCTEventEmitter.class).receiveEvent(container.getId(), eventName, payload);
    }

    private WritableMap buildDataPayload(InlineInAppMessageData data) {
        WritableMap payload = Arguments.createMap();
        WritableMap dataMap = Arguments.createMap();
        if (data != null) {
            dataMap.putString("campaignHash", data.getCampaignHash());
            dataMap.putString("variantIdentifier", data.getVariantId());
            dataMap.putString("placementKey", data.getPlacementKey());
            dataMap.putMap("additionalParameters", additionalParametersToWritableMap(data));
            dataMap.putBoolean("isTest", data.isTest());
        }
        payload.putMap("data", dataMap);
        return payload;
    }

    private WritableMap additionalParametersToWritableMap(InlineInAppMessageData data) {
        Map<String, Object> additionalParameters = data.getAdditionalParameters();
        if (additionalParameters == null) {
            return Arguments.createMap();
        }
        return MapUtil.objectMapToWritableMap(additionalParameters);
    }
}
