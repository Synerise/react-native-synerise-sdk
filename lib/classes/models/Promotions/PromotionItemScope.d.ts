declare enum PromotionItemScope {
    LineItem = "LINE_ITEM",
    Basket = "BASKET"
}
declare function PromotionItemScopeFromString(string: string): PromotionItemScope;
declare function PromotionItemScopeToString(promotionItemScope: PromotionItemScope): string;
export { PromotionItemScope, PromotionItemScopeFromString, PromotionItemScopeToString };
