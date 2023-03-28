import { CustomEvent } from './../CustomEvent';
declare class SearchedEvent extends CustomEvent {
    constructor(label: string, parameters?: object);
}
export { SearchedEvent };
