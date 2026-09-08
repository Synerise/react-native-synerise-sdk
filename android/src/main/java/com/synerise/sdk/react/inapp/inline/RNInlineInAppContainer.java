package com.synerise.sdk.react.inapp.inline;

import android.content.Context;
import android.view.ViewGroup;
import android.widget.FrameLayout;

import androidx.annotation.NonNull;

import com.synerise.sdk.injector.Injector;
import com.synerise.sdk.injector.inapp.inline.OnInlineInAppViewListener;
import com.synerise.sdk.injector.inapp.ui.inline.InlineInAppView;

/**
 * React Native host for a single SDK inline view. Owns a freshly created {@link InlineInAppView} by
 * default and can swap it for one the SDK already rendered and announced through the global listener.
 */
public class RNInlineInAppContainer extends FrameLayout {

    private InlineInAppView inlineInAppView;
    private OnInlineInAppViewListener viewListener;
    private boolean hasAdoptedView;

    public RNInlineInAppContainer(@NonNull Context context) {
        super(context);
        attachInlineInAppView(Injector.createInlineInAppView(context, ""));
    }

    @NonNull
    public InlineInAppView getInlineInAppView() {
        return inlineInAppView;
    }

    /** An adopted view already holds its campaign; re-applying a placement key would destroy it. */
    public boolean hasAdoptedView() {
        return hasAdoptedView;
    }

    public void setOnInlineInAppViewListener(OnInlineInAppViewListener listener) {
        this.viewListener = listener;
        inlineInAppView.setOnInlineInAppViewListener(listener);
    }

    /**
     * Replaces the owned view with one the SDK already rendered. The previous view is released so it
     * does not stay registered for the placement key and race the adopted one.
     */
    public void adoptInlineInAppView(@NonNull InlineInAppView retainedView) {
        if (retainedView == inlineInAppView) {
            return;
        }

        InlineInAppView previousView = inlineInAppView;
        removeView(previousView);
        previousView.setOnInlineInAppViewListener(null);
        previousView.release();

        detachFromCurrentParent(retainedView);
        attachInlineInAppView(retainedView);
        retainedView.setOnInlineInAppViewListener(viewListener);
        hasAdoptedView = true;
    }

    public void releaseInlineInAppView() {
        inlineInAppView.release();
        inlineInAppView.setOnInlineInAppViewListener(null);
        viewListener = null;
    }

    private void attachInlineInAppView(@NonNull InlineInAppView view) {
        inlineInAppView = view;
        addView(view, new LayoutParams(LayoutParams.MATCH_PARENT, LayoutParams.MATCH_PARENT));
    }

    private void detachFromCurrentParent(@NonNull InlineInAppView view) {
        ViewGroup parent = (ViewGroup) view.getParent();
        if (parent != null) {
            parent.removeView(view);
        }
    }
}
