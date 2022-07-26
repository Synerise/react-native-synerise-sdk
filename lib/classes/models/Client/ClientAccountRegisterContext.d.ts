import { BaseModel } from './../BaseModel';
import { ClientSex } from './../Client/ClientSex';
import { IClientAgreements, ClientAgreements } from './../Client/ClientAgreements';
interface IClientAccountRegisterContext {
    phone?: string;
    customId?: string;
    firstName?: string;
    lastName?: string;
    sex?: ClientSex;
    company?: string;
    address?: string;
    city?: string;
    province?: string;
    zipCode?: string;
    countryCode?: string;
    agreements?: IClientAgreements;
    attributes?: object;
}
declare class ClientAccountRegisterContext extends BaseModel {
    email: string;
    password: string;
    phone?: string;
    customId?: string;
    firstName?: string;
    lastName?: string;
    sex?: ClientSex;
    company?: string;
    address?: string;
    city?: string;
    province?: string;
    zipCode?: string;
    countryCode?: string;
    agreements: ClientAgreements;
    attributes?: object;
    constructor(email: string, password: string, modelObject?: IClientAccountRegisterContext);
    toObject(): object;
}
export { IClientAccountRegisterContext, ClientAccountRegisterContext };
