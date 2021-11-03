import { Event } from './../Event';
declare class LoggedOutEvent extends Event {
    constructor(label: string, parameters?: object);
}
export { LoggedOutEvent };
