import { z } from "zod";
import { StocksParamsSchema } from "../schemas";
import { RequestMethods } from "../core/http";

export class StockHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods) {
    this.request = requestMethods;
  }

  async getProductStocks(params: z.infer<typeof StocksParamsSchema>) {
    const validated = StocksParamsSchema.parse(params);
    return this.request.get("/stocks", validated);
  }
}
