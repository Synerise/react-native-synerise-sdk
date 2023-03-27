import { Event } from './../Event';
declare class LoggedInEvent extends Event {
    constructor(label: string, parameters?: object);
}
export { LoggedInEvent };
