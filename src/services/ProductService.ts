import { AxiosResponse } from "axios";
import $api from "../utils/http";

export default class ProductService {
    static async getProduct(body: any): Promise<AxiosResponse<any> | undefined> {
        try {
            return await $api.post('https://api.valantis.store:41000/', body);
        } catch (error) {
            console.log(error);
        }
    }
}
