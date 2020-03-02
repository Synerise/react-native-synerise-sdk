import { BaseModule as Module } from './BaseModule';
import { PromotionsApiQuery } from './../../classes/api_queries/PromotionsApiQuery';
import { PromotionResponse } from './../../classes/models/Promotions/PromotionResponse';
import { Promotion } from './../../classes/models/Promotions/Promotion';
import { AssignVoucherResponse } from './../../classes/models/Vouchers/AssignVoucherResponse';
import { VoucherCodesResponse } from './../../classes/models/Vouchers/VoucherCodesResponse';
import { Error } from './../../classes/types/Error';
declare class PromotionsModule extends Module {
    private static _instance;
    static instance(): PromotionsModule;
    private constructor();
    getAllPromotions(onSuccess: (promotionResponse: PromotionResponse) => void, onError: (error: Error) => void): void;
    getPromotions(apiQuery: PromotionsApiQuery, onSuccess: (promotionResponse: PromotionResponse) => void, onError: (error: Error) => void): void;
    getPromotionByUUID(uuid: string, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void): void;
    getPromotionByCode(code: string, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void): void;
    activatePromotionByUUID(uuid: string, onSuccess: () => void, onError: (error: Error) => void): void;
    activatePromotionByCode(code: string, onSuccess: () => void, onError: (error: Error) => void): void;
    deactivatePromotionByUUID(uuid: string, onSuccess: () => void, onError: (error: Error) => void): void;
    deactivatePromotionByCode(code: string, onSuccess: () => void, onError: (error: Error) => void): void;
    getOrAssignVoucher(poolUuid: string, onSuccess: (assignVoucherRespone: AssignVoucherResponse) => void, onError: (error: Error) => void): void;
    assignVoucherCode(poolUuid: string, onSuccess: (assignVoucherRespone: AssignVoucherResponse) => void, onError: (error: Error) => void): void;
    getAssignedVoucherCodes(onSuccess: (voucherCodesResponse: VoucherCodesResponse) => void, onError: (error: Error) => void): void;
}
export { PromotionsModule };
