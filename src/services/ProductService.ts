import { AxiosResponse } from "axios";
import $api from "../utils/http";
import { IProductFields, IProductIds, IProductItems } from "../interfaces/productInterfaces";
import { IProductFieldsReq, IProductFilterReq, IProductIdsReq, IProductItemsReq } from "../interfaces/productsReqParams";

const baseURL = 'http://api.valantis.store:40000/';

export default class ProductService {
    static async getProductsIds(body: IProductIdsReq): Promise<AxiosResponse<IProductIds> | undefined> {
        try {
            return await $api.post(baseURL, body);
        } catch (error) {
            console.log(error);
        }
    }

    static async getProductsItems(body: IProductItemsReq): Promise<AxiosResponse<IProductItems> | undefined> {
        try {
            return await $api.post(baseURL, body);
        } catch (error) {
            console.log(error);
        }
    }

    static async getProductsFields(body: IProductFieldsReq): Promise<AxiosResponse<IProductFields> | undefined> {
        try {
            return await $api.post(baseURL, body);
        } catch (error) {
            console.log(error);
        }
    }

    static async getFilteredProducts(body: IProductFilterReq): Promise<AxiosResponse<IProductIds> | undefined> {
        try {
            return await $api.post(baseURL, body);
        } catch (error) {
            console.log(error);
        }
    }
}
