import { BaseModel } from './../BaseModel';
interface IClientAgreements {
    email?: Boolean;
    sms?: Boolean;
    push?: Boolean;
    bluetooth?: Boolean;
    rfid?: Boolean;
    wifi?: Boolean;
}
declare class ClientAgreements extends BaseModel {
    email: Boolean;
    sms: Boolean;
    push: Boolean;
    bluetooth: Boolean;
    rfid: Boolean;
    wifi: Boolean;
    constructor(modelObject?: IClientAgreements);
}
export { IClientAgreements, ClientAgreements };
