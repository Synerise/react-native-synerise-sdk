import { CustomEvent } from './../CustomEvent';
declare class SharedEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { SharedEvent };
