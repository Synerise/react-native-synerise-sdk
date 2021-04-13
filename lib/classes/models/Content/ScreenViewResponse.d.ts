import { BaseModel } from '../BaseModel';
import { IScreenViewAudience, ScreenViewAudience } from './ScreenViewAudience';
interface IScreenViewResponse {
    audience: IScreenViewAudience;
    identifier: string;
    hashString: string;
    path: string;
    name: string;
    priority: number;
    descriptionText?: string;
    data: any;
    version: string;
    parentVersion: string;
    createdAt: number;
    updatedAt: number;
    deletedAt?: number;
}
declare class ScreenViewResponse extends BaseModel {
    audience: ScreenViewAudience;
    identifier: string;
    hashString: string;
    path: string;
    name: string;
    priority: number;
    descriptionText?: string;
    data: any;
    version: string;
    parentVersion: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
    constructor(modelObject: IScreenViewResponse);
}
export { IScreenViewResponse, ScreenViewResponse };
