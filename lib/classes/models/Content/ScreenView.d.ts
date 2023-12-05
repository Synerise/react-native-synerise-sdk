import { BaseModel } from '../BaseModel';
import { IScreenViewAudienceInfo, ScreenViewAudienceInfo } from './ScreenViewAudienceInfo';
interface IScreenView {
    identifier: string;
    name: string;
    hash: string;
    path: string;
    priority: number;
    audience: IScreenViewAudienceInfo;
    data: any;
    createdAt: number;
    updatedAt: number;
}
declare class ScreenView extends BaseModel {
    identifier: string;
    name: string;
    hash: string;
    path: string;
    priority: number;
    audience: ScreenViewAudienceInfo;
    data: any;
    createdAt: Date;
    updatedAt: Date;
    constructor(modelObject: IScreenView);
}
export { IScreenView, ScreenView };
