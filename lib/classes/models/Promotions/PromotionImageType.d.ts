declare enum PromotionImageType {
    Image = "image",
    Thumbnail = "thumbnail"
}
declare function PromotionImageTypeFromString(string: string): PromotionImageType;
declare function PromotionImageTypeToString(type: PromotionImageType): string;
export { PromotionImageType, PromotionImageTypeFromString, PromotionImageTypeToString };
