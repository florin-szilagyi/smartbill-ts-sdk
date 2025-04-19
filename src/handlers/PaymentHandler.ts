import { z } from "zod";
import { PaymentSchema, DefaultUrlSchema } from "../schemas/paymentSchemas";
import { RequestMethods } from "../core/http";

export class PaymentHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods) {
    this.request = requestMethods;
  }

  async create(data: z.infer<typeof PaymentSchema>) {
    const validated = PaymentSchema.parse(data);
    return this.request.post("/payment", validated);
  }

  async deleteOther(data: z.infer<typeof DefaultUrlSchema>) {
    const validated = DefaultUrlSchema.parse(data);
    return this.request.del("/payment/v2", validated);
  }

  async deleteReceipt(data: z.infer<typeof DefaultUrlSchema>) {
    const validated = DefaultUrlSchema.parse(data);
    return this.request.del("/payment/chitanta", validated);
  }

  async getFiscalPrinterText(params: { id: string }) {
    return this.request.get("/payment/text", params);
  }
}
