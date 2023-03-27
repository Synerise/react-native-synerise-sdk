import { BaseModel } from '../BaseModel';
import { IAssignVoucherData, AssignVoucherData } from './../Vouchers/AssignVoucherData';
interface IAssignVoucherResponse {
    message: string;
    data: IAssignVoucherData;
}
declare class AssignVoucherResponse extends BaseModel {
    message: string;
    data: AssignVoucherData;
    constructor(modelObject: IAssignVoucherResponse);
}
export { IAssignVoucherResponse, AssignVoucherResponse };
