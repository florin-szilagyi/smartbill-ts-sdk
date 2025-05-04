import { SmartbillResponse } from "./SmartBillSDK";

export type UrlParams = Record<string, string | number | boolean | null | undefined>;

export interface RequestMethods {
  getBuffer: (path: string, query?: UrlParams) => Promise<SmartbillResponse<Buffer>>;
  get: <T>(path: string, query?: UrlParams) => Promise<SmartbillResponse<T>>;
  post: <T>(path: string, body: object) => Promise<SmartbillResponse<T>>;
  put: <T>(path: string, paramsOrBody: UrlParams | object) => Promise<SmartbillResponse<T>>;
  del: <T>(path: string, params: UrlParams) => Promise<SmartbillResponse<T>>;
}
