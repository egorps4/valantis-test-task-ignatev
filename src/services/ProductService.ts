import { AxiosResponse } from "axios";
import $api from "../utils/http";
import { IProductFields, IProductIds, IProductItems } from "../interfaces/productInterfaces";
import { IProductFieldsReq, IProductFilterReq, IProductIdsReq, IProductItemsReq } from "../interfaces/productsReqParams";

const baseURL = 'https://api.valantis.store:41000/';

export default class ProductService {
    static async getProductsIds(body: IProductIdsReq): Promise<AxiosResponse<IProductIds> | undefined> {
        return await $api.post(baseURL, body);
    }

    static async getProductsItems(body: IProductItemsReq): Promise<AxiosResponse<IProductItems> | undefined> {
        return await $api.post(baseURL, body);
    }

    static async getProductsFields(body: IProductFieldsReq): Promise<AxiosResponse<IProductFields> | undefined> {
        return await $api.post(baseURL, body);
    }

    static async getFilteredProducts(body: IProductFilterReq): Promise<AxiosResponse<IProductIds> | undefined> {
        return await $api.post(baseURL, body);
    }
}
