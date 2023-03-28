import { CustomEvent } from './../CustomEvent';
declare class VisitedScreenEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { VisitedScreenEvent };
