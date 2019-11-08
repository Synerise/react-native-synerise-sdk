import { BaseModule as Module } from './BaseModule';
import { Event } from './../../classes/events/Event';
declare class TrackerModule extends Module {
    private static _instance;
    static instance(): TrackerModule;
    private constructor();
    setCustomIdentifier(identifier: String): void;
    setCustomEmail(email: String): void;
    send(event: Event): void;
    flushEvents(onSuccess: () => void): void;
}
export { TrackerModule };
