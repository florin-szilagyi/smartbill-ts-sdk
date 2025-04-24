import { z } from "zod";
import { StocksParamsSchema } from "../schemas";
import { RequestMethods } from "../core/http";

export interface StockHandler {
  getProductStocks(params: z.infer<typeof StocksParamsSchema>): Promise<StockResponse>;
}

export interface StockResponse {
  series: string;
  number: string;
  errorText: string;
  message: string;
  url: string;
}

export class StockHandlerImpl implements StockHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods) {
    this.request = requestMethods;
  }

  async getProductStocks(params: z.infer<typeof StocksParamsSchema>): Promise<StockResponse> {
    const validated = StocksParamsSchema.parse(params);
    return this.request.get<StockResponse>("/stocks", validated);
  }
}
