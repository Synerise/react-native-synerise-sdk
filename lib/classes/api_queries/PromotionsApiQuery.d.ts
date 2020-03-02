import { BaseApiQuery, IApiQuerySorting } from './BaseApiQuery';
import { PromotionStatus } from '../models/Promotions/PromotionStatus';
import { PromotionType } from '../models/Promotions/PromotionType';
declare class PromotionsApiQuery extends BaseApiQuery {
    statuses: Array<PromotionStatus>;
    types: Array<PromotionType>;
    toObject(): {
        statuses: PromotionStatus[];
        types: PromotionType[];
        sorting: IApiQuerySorting[];
        limit: number;
        page: number;
        includeMeta: boolean;
    };
}
export { PromotionsApiQuery };
