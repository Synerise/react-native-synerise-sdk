import { BaseModel } from '../BaseModel';
import { IVoucherCodeData, VoucherCodeData } from './VoucherCodeData';
interface IVoucherCodesResponse {
    data: Array<IVoucherCodeData>;
}
declare class VoucherCodesResponse extends BaseModel {
    data: Array<VoucherCodeData>;
    constructor(modelObject: IVoucherCodesResponse);
}
export { IVoucherCodesResponse, VoucherCodesResponse };
