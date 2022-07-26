interface ModelMappableConstructor<M> {
    new (modelObject?: any): M;
}
interface ModelMappable {
    toObject(): object;
    toObjectIfNotEmpty(): object | undefined;
}
declare abstract class BaseModel implements ModelMappable {
    constructor();
    constructor(modelObject: object);
    toObject(): object;
    toObjectIfNotEmpty(): object | undefined;
}
declare type ModelMappingFunction = (modelObject: object) => BaseModel | null;
declare class ModelMapper {
    mappingFunction: ModelMappingFunction;
    static make<T extends BaseModel>(modelClass: ModelMappableConstructor<T>): ModelMapper;
    constructor(mappingFunction: ModelMappingFunction);
    getModelInstance(modelObject: object): any;
}
export { ModelMapper, ModelMappingFunction, BaseModel };
