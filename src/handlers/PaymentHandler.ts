import { z } from "zod";
import { RequestMethods } from "../core/http";
import { DefaultUrlSchema, PaymentSchema, GetFiscalPrinterTextParamsSchema, DeleteOtherPaymentSchema } from "../schemas";

export interface PaymentHandler {
  create(data: z.infer<typeof PaymentSchema>): Promise<PaymentResponse>;
  deleteOther(data: z.infer<typeof DeleteOtherPaymentSchema>): Promise<PaymentResponse>;
  deleteReceipt(data: z.infer<typeof DefaultUrlSchema>): Promise<PaymentResponse>;
  getFiscalPrinterText(params:z.infer<typeof GetFiscalPrinterTextParamsSchema>): Promise<PaymentResponse>;
}

export interface PaymentResponse {
  series: string;
  number: string;
  errorText: string;
  message: string;
  url: string;
}

export class PaymentHandlerImpl implements PaymentHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods){
    this.request = requestMethods;
  }

  async create(data: z.infer<typeof PaymentSchema>): Promise<PaymentResponse> {
    const validated = PaymentSchema.parse(data);
    return this.request.post<PaymentResponse>("/payment", validated);
  }
  async deleteOther(data: z.infer<typeof DeleteOtherPaymentSchema>): Promise<PaymentResponse> {
    const validated = DeleteOtherPaymentSchema.parse(data);
    return this.request.del<PaymentResponse>("/payment/v2", validated);
  }

  async deleteReceipt(data: z.infer<typeof DefaultUrlSchema>): Promise<PaymentResponse> {
    const validated = DefaultUrlSchema.parse(data);
    return this.request.del<PaymentResponse>("/payment/chitanta", validated);
  }

  async getFiscalPrinterText(params:z.infer<typeof GetFiscalPrinterTextParamsSchema>): Promise<PaymentResponse> {
    return this.request.get<PaymentResponse>("/payment/text", params);
  }
}
