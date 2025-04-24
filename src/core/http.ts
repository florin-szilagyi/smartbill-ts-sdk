export type UrlParams = Record<string, string | number | boolean | null | undefined>;

export interface RequestMethods {
  getBuffer: (path: string, query?: UrlParams) => Promise<Buffer>;
  get: <T>(path: string, query?: UrlParams) => Promise<T>;
  post: <T>(path: string, body: object) => Promise<T>;
  put: <T>(path: string, paramsOrBody: UrlParams | object) => Promise<T>;
  del: <T>(path: string, params: UrlParams) => Promise<T>;
}
