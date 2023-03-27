import { DocumentsApiQueryType } from './DocumentsApiQueryType';
declare class DocumentsApiQuery {
    type: DocumentsApiQueryType;
    typeValue: string;
    version: string;
    constructor(type: DocumentsApiQueryType, typeValue: string, version: string);
    toObject(): {
        type: DocumentsApiQueryType;
        typeValue: string;
        version: string;
    };
}
export { DocumentsApiQuery };
