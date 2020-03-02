import { BaseModel } from '../BaseModel';
interface IVoucherCodeData {
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
declare class VoucherCodeData extends BaseModel {
    code: string;
    status: string;
    clientUuid: string;
    poolUuid: string;
    expireIn?: Date;
    redeemAt?: Date;
    assignedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
    constructor(modelObject: IVoucherCodeData);
}
export { IVoucherCodeData, VoucherCodeData };
