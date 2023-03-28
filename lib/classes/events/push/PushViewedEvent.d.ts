import { CustomEvent } from '../CustomEvent';
declare class PushViewedEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { PushViewedEvent };
