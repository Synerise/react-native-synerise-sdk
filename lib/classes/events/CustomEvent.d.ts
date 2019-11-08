import { Event } from './Event';
declare class CustomEvent extends Event {
    constructor(label: string, action: string, parameters?: Record<string, any>);
    setString(key: string, string: string): void;
    setNumber(key: string, number: number): void;
    setBool(key: string, bool: boolean): void;
    setObject(key: string, object: object): void;
}
export { CustomEvent };
