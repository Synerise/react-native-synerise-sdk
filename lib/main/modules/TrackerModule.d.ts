import { BaseModule as Module } from './BaseModule';
import { Event } from './../../classes/events/Event';
declare class TrackerModule extends Module {
    private static _instance;
    static instance(): TrackerModule;
    private constructor();
    /**
     * This method sets a custom identifier in the parameters of every event.
     *
     * @param identifier Customer’s custom identifier
     *
     */
    setCustomIdentifier(identifier: string): void;
    /**
     * This method sets a custom email in the parameters of every event.
     *
     * @param email Customer’s custom email
     *
     */
    setCustomEmail(email: string): void;
    /**
     * This method sends an event.
     *
     * @param event Event object
     *
     */
    send(event: Event): void;
    /**
     * This method forces sending the events from the queue to the server.
     *
     * @param onSuccess Function to be executed when the operation is completed successfully
     *
     */
    flushEvents(onSuccess: () => void): void;
}
export { TrackerModule };
