import { CustomEvent } from './../CustomEvent';
declare class HitTimerEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { HitTimerEvent };
