import { CustomEvent } from './../CustomEvent';
declare class LoggedInEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { LoggedInEvent };
