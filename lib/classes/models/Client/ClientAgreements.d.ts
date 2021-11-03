import { BaseModel } from './../BaseModel';
interface IClientAgreements {
    email?: boolean;
    sms?: boolean;
    push?: boolean;
    bluetooth?: boolean;
    rfid?: boolean;
    wifi?: boolean;
}
declare class ClientAgreements extends BaseModel {
    email: boolean;
    sms: boolean;
    push: boolean;
    bluetooth: boolean;
    rfid: boolean;
    wifi: boolean;
    constructor(modelObject?: IClientAgreements);
}
export { IClientAgreements, ClientAgreements };
