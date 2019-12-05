import { BaseModel } from './../BaseModel';
import { TokenOrigin } from './TokenOrigin';
interface IToken {
    tokenString: String;
    tokenOrigin: String;
    expirationDate: number;
}
declare class Token extends BaseModel {
    tokenString: String;
    tokenOrigin: TokenOrigin;
    expirationDate: Date;
    constructor(modelObject: IToken);
}
export { Token };
