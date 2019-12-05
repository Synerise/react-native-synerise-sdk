import { BaseModule as Module } from './BaseModule';
import { Event } from './../../classes/events/Event';
declare class TrackerModule extends Module {
    private static _instance;
    static instance(): TrackerModule;
    private constructor();
    setCustomIdentifier(identifier: string): void;
    setCustomEmail(email: string): void;
    send(event: Event): void;
    flushEvents(onSuccess: () => void): void;
}
export { TrackerModule };
