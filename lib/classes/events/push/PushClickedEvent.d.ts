import { CustomEvent } from '../CustomEvent';
declare class PushClickedEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { PushClickedEvent };
