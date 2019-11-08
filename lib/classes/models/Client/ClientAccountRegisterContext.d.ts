import { BaseModel } from './../BaseModel';
import { ClientSex } from './../Client/ClientSex';
import { IClientAgreements, ClientAgreements } from './../Client/ClientAgreements';
interface IClientAccountRegisterContext {
    phone?: String;
    customId?: String;
    firstName?: String;
    lastName?: String;
    sex?: ClientSex;
    company?: String;
    address?: String;
    city?: String;
    province?: String;
    zipCode?: String;
    countryCode?: String;
    agreements?: IClientAgreements;
    attributes?: object;
    tags?: Array<String>;
}
declare class ClientAccountRegisterContext extends BaseModel {
    email: String;
    password: String;
    phone?: String;
    customId?: String;
    firstName?: String;
    lastName?: String;
    sex?: ClientSex;
    company?: String;
    address?: String;
    city?: String;
    province?: String;
    zipCode?: String;
    countryCode?: String;
    agreements?: ClientAgreements;
    attributes?: object;
    tags?: Array<String>;
    constructor(email: String, password: String, modelObject?: IClientAccountRegisterContext);
    toObject(): object;
}
export { IClientAccountRegisterContext, ClientAccountRegisterContext };
