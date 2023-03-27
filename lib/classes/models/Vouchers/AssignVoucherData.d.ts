import { BaseModel } from '../BaseModel';
interface IAssignVoucherData {
    code: string;
    expireIn?: number;
    redeemAt?: number;
    assignedAt?: number;
    createdAt: number;
    updatedAt: number;
}
declare class AssignVoucherData extends BaseModel {
    code: string;
    expireIn?: Date;
    redeemAt?: Date;
    assignedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(modelObject: IAssignVoucherData);
}
export { IAssignVoucherData, AssignVoucherData };
