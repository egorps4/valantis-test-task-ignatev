interface IProductIdsParams {
    offset?: number;
    limit?: number;
}

export interface IProductIdsReq {
    action: string;
    params: IProductIdsParams;
}

interface IProductItemsParams {
    ids: string[];
}

export interface IProductItemsReq {
    action: string;
    params: IProductItemsParams;
}

interface IProductFieldsParams {
    field: string;
    offset?: number;
    limit?: number;
}

export interface IProductFieldsReq {
    action: string;
    params?: IProductFieldsParams;
}

interface IProductFilterParams {
    price?: string;
    brand?: string;
    product?: string;
    offset?: number;
    limit?: number;
}

export interface IProductFilterReq {
    action: string;
    params: IProductFilterParams;
}
