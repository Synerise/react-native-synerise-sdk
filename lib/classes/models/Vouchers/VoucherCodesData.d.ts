import { BaseModel } from '../BaseModel';
interface IVoucherCodesData {
    code: string;
    status: string;
    clientUuid: string;
    poolUuid: string;
    expireIn?: number;
    redeemAt?: number;
    assignedAt?: number;
    createdAt: number;
    updatedAt: number;
}
declare class VoucherCodesData extends BaseModel {
    code: string;
    status: string;
    clientUuid: string;
    poolUuid: string;
    expireIn?: Date;
    redeemAt?: Date;
    assignedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(modelObject: IVoucherCodesData);
}
export { IVoucherCodesData, VoucherCodesData };
