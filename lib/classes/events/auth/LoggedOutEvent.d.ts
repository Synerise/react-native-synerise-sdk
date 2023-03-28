import { CustomEvent } from './../CustomEvent';
declare class LoggedOutEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { LoggedOutEvent };
