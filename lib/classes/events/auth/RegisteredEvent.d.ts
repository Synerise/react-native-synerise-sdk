import { CustomEvent } from './../CustomEvent';
declare class RegisteredEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { RegisteredEvent };
