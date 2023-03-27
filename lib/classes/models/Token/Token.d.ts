import { BaseModel } from './../BaseModel';
import { TokenOrigin } from './TokenOrigin';
interface IToken {
    tokenString: string;
    tokenOrigin: string;
    expirationDate: number;
}
declare class Token extends BaseModel {
    tokenString: string;
    tokenOrigin: TokenOrigin;
    expirationDate: Date;
    constructor(modelObject: IToken);
}
export { Token };
