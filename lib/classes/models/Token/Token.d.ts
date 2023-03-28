import { BaseModel } from './../BaseModel';
import { TokenOrigin } from './TokenOrigin';
interface IToken {
    tokenString: string;
    expirationDate: number;
    rlm: string;
    origin: string;
    customId?: string;
}
declare class Token extends BaseModel {
    tokenString: string;
    expirationDate: Date;
    rlm: string;
    origin: TokenOrigin;
    customId?: string;
    constructor(modelObject: IToken);
}
export { Token };
