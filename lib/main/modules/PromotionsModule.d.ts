import { BaseModule as Module } from './BaseModule';
import { PromotionsApiQuery } from './../../classes/api_queries/PromotionsApiQuery';
import { PromotionIdentifier } from '../../config/import_models';
import { PromotionActivationOptions } from '../../classes/models/Promotions/PromotionActivationOptions';
import { PromotionResponse } from './../../classes/models/Promotions/PromotionResponse';
import { Promotion } from './../../classes/models/Promotions/Promotion';
import { AssignVoucherResponse } from './../../classes/models/Vouchers/AssignVoucherResponse';
import { VoucherCodesResponse } from './../../classes/models/Vouchers/VoucherCodesResponse';
import { Error } from './../../classes/types/Error';
declare class PromotionsModule extends Module {
    private static _instance;
    static instance(): PromotionsModule;
    private constructor();
    /**
     * This method retrieves all available promotions that are defined for a customer.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getAllPromotions(onSuccess: (promotionResponse: PromotionResponse) => void, onError: (error: Error) => void): void;
    /**
     * This method retrieves promotions that match the parameters defined in the query object.
     *
     * @param apiQuery `PromotionsApiQuery` object responsible for storing all query parameters
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getPromotions(apiQuery: PromotionsApiQuery, onSuccess: (promotionResponse: PromotionResponse) => void, onError: (error: Error) => void): void;
    /**
     * This method retrieves the promotion with the specified UUID.
     *
     * @param uuid UUID of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getPromotionByUUID(uuid: string, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void): void;
    /**
     * This method retrieves the promotion with the specified code.
     *
     * @param code Code of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getPromotionByCode(code: string, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void): void;
    /**
     * This method activates the promotion with the specified UUID.
     *
     * @param uuid UUID of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    activatePromotionByUUID(uuid: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method activates the promotion with the specified code.
     *
     * @param code Code of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    activatePromotionByCode(code: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method activates and gets the promotion defined for the options provided.
     *
     * @param options `PromotionActivationOptions` object with parameters for promotion activation.
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    activatePromotion(options: PromotionActivationOptions, onSuccess: (promotion: Promotion) => void, onError: (error: Error) => void): void;
    /**
     * This method deactivates the promotion with the specified UUID.
     *
     * @param uuid UUID of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    deactivatePromotionByUUID(uuid: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method deactivates the promotion with the specified code.
     *
     * @param code Code of the promotion
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    deactivatePromotionByCode(code: string, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method activates promotions with a code or with UUID in a batch.
     *
     * @param promotionsIdentifiers List of promotion identifiers
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    activatePromotionsBatch(promotionsIdentifiers: Array<PromotionIdentifier>, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method deactivates promotions with a code or with UUID in a batch.
     *
     * @param promotionsIdentifiers List of promotion identifiers
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    deactivatePromotionsBatch(promotionsIdentifiers: Array<PromotionIdentifier>, onSuccess: () => void, onError: (error: Error) => void): void;
    /**
     * This method retrieves an assigned voucher code or assigns a voucher from a pool identified by UUID to the customer.
     *
     * @param poolUuid Pool’s universally unique identifier
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getOrAssignVoucher(poolUuid: string, onSuccess: (assignVoucherRespone: AssignVoucherResponse) => void, onError: (error: Error) => void): void;
    /**
     * This method assigns a voucher from a pool identified by UUID to the customer.
     *
     * @param poolUuid Pool’s universally unique identifier
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    assignVoucherCode(poolUuid: string, onSuccess: (assignVoucherRespone: AssignVoucherResponse) => void, onError: (error: Error) => void): void;
    /**
     * This method retrieves voucher codes for a customer.
     *
     * @param onSuccess Function to be executed when the operation finishes successfully
     * @param onError Function to be executed when the operation finishes unsuccessfully
     *
     */
    getAssignedVoucherCodes(onSuccess: (voucherCodesResponse: VoucherCodesResponse) => void, onError: (error: Error) => void): void;
}
export { PromotionsModule };
