import { BaseModel } from '../BaseModel';
interface IDocument {
    uuid: string;
    slug: string;
    schema: string;
    content: object;
}
declare class Document extends BaseModel {
    uuid: string;
    slug: string;
    schema: string;
    content: object;
    constructor(modelObject: IDocument);
}
export { IDocument, Document };
