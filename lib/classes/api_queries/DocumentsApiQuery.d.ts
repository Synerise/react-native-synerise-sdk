import { DocumentsApiQueryType } from "./DocumentsApiQueryType";
declare class DocumentsApiQuery {
    type: DocumentsApiQueryType;
    typeValue: String;
    version: String;
    constructor(type: DocumentsApiQueryType, typeValue: String, version: String);
    toObject(): {
        type: DocumentsApiQueryType;
        typeValue: String;
        version: String;
    };
}
export { DocumentsApiQuery };
