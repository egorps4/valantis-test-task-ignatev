import { IProductFilterReq, IProductIdsReq, IProductItemsReq } from "../interfaces/productsReqParams";
import { AppDispatch } from "../store/store";

type ReqBody = IProductIdsReq | IProductItemsReq | IProductFilterReq;


export async function fetchWithRetry(dispatch: AppDispatch, actionCreator: any, body: ReqBody, retryDelay = 1000, maxRetries = 3) {
    let retries = 0;
    async function attemptFetch() {
      try {
        await dispatch(actionCreator(body));
      } catch (error) {
        if (retries < maxRetries) {
          retries++;
          setTimeout(attemptFetch, retryDelay);
        } else {
          console.error("Max retries reached", error);
          throw new Error();
        }
      }
    }
    attemptFetch();
  }