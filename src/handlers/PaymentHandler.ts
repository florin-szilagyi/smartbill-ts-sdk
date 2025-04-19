import { z } from "zod";
import { RequestMethods } from "../core/http";
import { DefaultUrlSchema, PaymentSchema, GetFiscalPrinterTextParamsSchema, DeleteOtherPaymentSchema } from "../schemas";

export class PaymentHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods) {
    this.request = requestMethods;
  }

  async create(data: z.infer<typeof PaymentSchema>) {
    const validated = PaymentSchema.parse(data);
    return this.request.post("/payment", validated);
  }

  async deleteOther(data: z.infer<typeof DeleteOtherPaymentSchema>) {
    const validated = DeleteOtherPaymentSchema.parse(data);
    return this.request.del("/payment/v2", validated);
  }

  async deleteReceipt(data: z.infer<typeof DefaultUrlSchema>) {
    const validated = DefaultUrlSchema.parse(data);
    return this.request.del("/payment/chitanta", validated);
  }

  async getFiscalPrinterText(params:z.infer<typeof GetFiscalPrinterTextParamsSchema>) {
    return this.request.get("/payment/text", params);
  }
}
