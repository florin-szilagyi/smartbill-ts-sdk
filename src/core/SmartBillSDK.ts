import { InvoiceHandlerImpl } from "../handlers/InvoiceHandler";
import { EstimateHandlerImpl } from "../handlers/EstimateHandler";
import { PaymentHandler } from "../handlers/PaymentHandler";
import { ConfigurationHandler } from "../handlers/ConfigurationHandler";
import { StockHandler } from "../handlers/StockHandler";
import { RequestMethods } from "./http";

export interface SmartBillSDKConfig {
  email: string; // email
  token: string; // API Token
  baseUrl?: string; // Defaults to https://ws.smartbill.ro/SBORO/api
  verbose?: boolean; // Defaults to false
}

export class SmartBillSDK {
  private baseUrl: string;
  private headers: Record<string, string>;
  public readonly invoices: InvoiceHandlerImpl;
  public readonly estimates: EstimateHandlerImpl;
  public readonly payments: PaymentHandler;
  public readonly configuration: ConfigurationHandler;
  public readonly stocks: StockHandler;
  public readonly verbose: boolean;

  constructor(config: SmartBillSDKConfig) {
    this.baseUrl = config.baseUrl || "https://ws.smartbill.ro/SBORO/api";
    const basicAuth = Buffer.from(`${config.email}:${config.token}`).toString("base64");
    this.headers = {
      Authorization: `Basic ${basicAuth}`,
      "Content-Type": "application/json"
    };
    const requestMethods: RequestMethods = {
      get: this.get.bind(this),
      post: this.post.bind(this),
      put: this.put.bind(this),
      del: this.del.bind(this),
    };
    this.invoices = new InvoiceHandlerImpl(requestMethods);
    this.estimates = new EstimateHandlerImpl(requestMethods);
    this.payments = new PaymentHandler(requestMethods);
    this.configuration = new ConfigurationHandler(requestMethods);
    this.stocks = new StockHandler(requestMethods);
    this.verbose = config.verbose || false;
  }

  // --- Private HTTP Methods ---
  private async get<T>(path: string, query?: Record<string, any>): Promise<T | Buffer> {
    let url = `${this.baseUrl}${path}`;
    if (query && Object.keys(query).length > 0) {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(query)) {
        if (v !== undefined && v !== null) params.append(k, String(v));
      }
      if (params.toString()) {
        url += (url.includes("?") ? "&" : "?") + params.toString();
      }
    }
    if (this.verbose) {
      console.log(`[Request] GET ${url} ${JSON.stringify(query)}`);
    }
    const resp = await fetch(url, {
      method: "GET",
      headers: this.headers,
    });
    if (this.verbose) {
      console.log(`[Response] GET ${url}:`, resp.status, resp.statusText);
    }
    if (!resp.ok) {
      let errorText = "";
      try {
        errorText = await resp.text();
      } catch (readError: any) {
        errorText = `(Failed to read response body: ${readError.message})`;
      }
      throw new Error(`GET ${path} failed: ${resp.status} ${resp.statusText}. ${errorText}`);
    }
    if (!resp.headers.get("content-type")?.includes("application/json")) {
      return Buffer.from(await resp.arrayBuffer());
    }
    return await resp.json();
  }

  private async post<T>(path: string, body: object): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    if (this.verbose) {
      console.log(`[Request] POST ${url} ${JSON.stringify(body)}`);
    }
    const resp = await fetch(url, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify(body),
    });
    if (this.verbose) {
      console.log(`[Response] POST ${url}:`, resp.status, resp.statusText);
    }
    if (!resp.ok) {
      let errorText = "";
      try {
        errorText = await resp.text();
      } catch (readError: any) {
        errorText = `(Failed to read response body: ${readError.message})`;
      }
      throw new Error(`POST ${path} failed: ${resp.status} ${resp.statusText}. ${errorText}`);
    }
    return await resp.json();
  }

  private async put<T>(path: string, paramsOrBody: Record<string, any> | object): Promise<T> {
    let url = `${this.baseUrl}${path}`;
    let options: RequestInit = { method: "PUT", headers: this.headers };
    // Assume: if paramsOrBody has typical URL params, treat as query string
    if (paramsOrBody && ("cif" in paramsOrBody || "seriesname" in paramsOrBody)) {
      const params = new URLSearchParams();
      for (const [k, v] of Object.entries(paramsOrBody)) {
        if (v !== undefined && v !== null) params.append(k, String(v));
      }
      if (params.toString()) {
        url += (url.includes("?") ? "&" : "?") + params.toString();
      }
    } else {
      options.body = JSON.stringify(paramsOrBody);
    }
    if (this.verbose) {
      console.log(`[Request] PUT ${url} ${JSON.stringify(paramsOrBody)}`);
    }
    const resp = await fetch(url, options);
    if (this.verbose) {
      console.log(`[Response] PUT ${url}:`, resp.status, resp.statusText);
    }
    if (!resp.ok) {
      let errorText = "";
      try {
        errorText = await resp.text();
      } catch (readError: any) {
        errorText = `(Failed to read response body: ${readError.message})`;
      }
      throw new Error(`PUT ${path} failed: ${resp.status} ${resp.statusText}. ${errorText}`);
    }
    return await resp.json();
  }

  private async del<T>(path: string, params: Record<string, any>): Promise<T> {
    let url = `${this.baseUrl}${path}`;
    if (params && Object.keys(params).length > 0) {
      const queryParams = new URLSearchParams();
      for (const [k, v] of Object.entries(params)) {
        if (v !== undefined && v !== null) queryParams.append(k, String(v));
      }
      if (queryParams.toString()) {
        url += (url.includes("?") ? "&" : "?") + queryParams.toString();
      }
    }
    if (this.verbose) {
      console.log(`[Request] DELETE ${url} ${JSON.stringify(params)}`);
    }
    const resp = await fetch(url, {
      method: "DELETE",
      headers: this.headers,
    });
    if (this.verbose) {
      console.log(`[Response] DELETE ${url}:`, resp.status, resp.statusText);
    }
    if (!resp.ok) {
      let errorText = "";
      try {
        errorText = await resp.text();
      } catch (readError: any) {
        errorText = `(Failed to read response body: ${readError.message})`;
      }
      throw new Error(`DELETE ${path} failed: ${resp.status} ${resp.statusText}. ${errorText}`);
    }
    return await resp.json();
  }
}
