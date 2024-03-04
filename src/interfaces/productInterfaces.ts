interface IProduct {
    brand: string | null;
    id: string;
    price: number;
    product: string;
}

export interface IProductIds {
    result: string[];
}

export interface IProductItems {
    result: IProduct[];
}

export interface IProductFields {
    result: string[];
}