import React from 'react';
import { ViewStyle } from 'react-native';
import { InlineInAppMessageData } from '../../../classes/models/Misc/InlineInAppMessageData';
import { InlineInAppSize } from '../../../classes/models/Misc/InlineInAppSize';
interface InlineInAppViewProps {
    placementKey: string;
    identifier?: string;
    /** Set by the SDK when handing over an already-rendered view through the global listener. */
    adoptViewId?: string;
    style?: ViewStyle;
    onLoaded?: (data: InlineInAppMessageData) => void;
    onUpdated?: (data: InlineInAppMessageData) => void;
    onFailed?: (data: InlineInAppMessageData, error: string) => void;
    onRemove?: (data: InlineInAppMessageData) => void;
    onSizeChanged?: (data: InlineInAppMessageData, size: InlineInAppSize) => void;
    onProcessingStarted?: () => void;
}
interface InlineInAppViewHandle {
    render(): void;
    release(): void;
    /** Resolves false when the view is not mounted or holds no rendered campaign. */
    isRendered(): Promise<boolean>;
    /** Resolves null when the view is not mounted or holds no rendered campaign. */
    getData(): Promise<InlineInAppMessageData | null>;
}
declare const InlineInAppView: React.ForwardRefExoticComponent<InlineInAppViewProps & React.RefAttributes<InlineInAppViewHandle>>;
export { InlineInAppView, InlineInAppViewProps, InlineInAppViewHandle };
