import { z } from "zod";
import { VatTaxRatesParamsSchema, SeriesParamsSchema, TaxResponse, SeriesResponse } from "../schemas";
import { RequestMethods } from "../core/http";
import { SmartbillResponse } from "../core/SmartBillSDK";

export interface ConfigurationHandler {
  getVatTaxRates(params: z.infer<typeof VatTaxRatesParamsSchema>): Promise<SmartbillResponse<TaxResponse>>;
  getDocumentSeries(params: z.infer<typeof SeriesParamsSchema>): Promise<SmartbillResponse<SeriesResponse>>;
}

export class ConfigurationHandlerImpl implements ConfigurationHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods) {
    this.request = requestMethods;
  }

  async getVatTaxRates(params: z.infer<typeof VatTaxRatesParamsSchema>): Promise<SmartbillResponse<TaxResponse>> {
    const validated = VatTaxRatesParamsSchema.parse(params);
    const result = await this.request.get<TaxResponse>("/tax", validated);
    if (Buffer.isBuffer(result)) {
      throw new Error("Unexpected non-JSON response received from /tax endpoint");
    }
    return result;
  }

  async getDocumentSeries(params: z.infer<typeof SeriesParamsSchema>): Promise<SmartbillResponse<SeriesResponse>> {
    const validated = SeriesParamsSchema.parse(params);
    const result = await this.request.get<SeriesResponse>("/series", validated);
    if (Buffer.isBuffer(result)) {
      throw new Error("Unexpected non-JSON response received from /series endpoint");
    }
    return result;
  }
}
