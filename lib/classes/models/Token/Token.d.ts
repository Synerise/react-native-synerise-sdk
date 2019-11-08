import { BaseModel } from './../BaseModel';
import { TokenOrigin } from './TokenOrigin';
interface IToken {
    tokenString: String;
    tokenOrigin: String;
    expirationDate: String;
}
declare class Token extends BaseModel {
    tokenString: String;
    tokenOrigin: TokenOrigin;
    constructor(modelObject: IToken);
}
export { Token };
