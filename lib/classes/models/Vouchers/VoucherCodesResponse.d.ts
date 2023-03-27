import { BaseModel } from '../BaseModel';
import { IVoucherCodesData, VoucherCodesData } from './VoucherCodesData';
interface IVoucherCodesResponse {
    data: Array<IVoucherCodesData>;
}
declare class VoucherCodesResponse extends BaseModel {
    data: Array<VoucherCodesData>;
    constructor(modelObject: IVoucherCodesResponse);
}
export { IVoucherCodesResponse, VoucherCodesResponse };
