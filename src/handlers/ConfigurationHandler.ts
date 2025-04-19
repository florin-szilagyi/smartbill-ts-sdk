import { z } from "zod";
import { VatTaxRatesParamsSchema, SeriesParamsSchema } from "../schemas";
import { RequestMethods } from "../core/http";

export class ConfigurationHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods) {
    this.request = requestMethods;
  }

  async getVatTaxRates(params: z.infer<typeof VatTaxRatesParamsSchema>) {
    const validated = VatTaxRatesParamsSchema.parse(params);
    return this.request.get("/tax", validated);
  }

  async getDocumentSeries(params: z.infer<typeof SeriesParamsSchema>) {
    const validated = SeriesParamsSchema.parse(params);
    return this.request.get("/series", validated);
  }
}
