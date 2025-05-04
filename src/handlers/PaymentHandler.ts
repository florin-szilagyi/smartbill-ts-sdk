import { z } from "zod";
import { RequestMethods } from "../core/http";
import { DefaultUrlSchema, PaymentSchema, GetFiscalPrinterTextParamsSchema, DeleteOtherPaymentSchema } from "../schemas";
import { SmartbillResponse } from "../core/SmartBillSDK";

export interface PaymentHandler {
  create(data: z.infer<typeof PaymentSchema>): Promise<SmartbillResponse<PaymentResponse>>;
  deleteOther(data: z.infer<typeof DeleteOtherPaymentSchema>): Promise<SmartbillResponse<PaymentResponse>>;
  deleteReceipt(data: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<PaymentResponse>>;
  getFiscalPrinterText(params:z.infer<typeof GetFiscalPrinterTextParamsSchema>): Promise<SmartbillResponse<PaymentResponse>>;
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

  async create(data: z.infer<typeof PaymentSchema>): Promise<SmartbillResponse<PaymentResponse>> {
    const validated = PaymentSchema.parse(data);
    return this.request.post<PaymentResponse>("/payment", validated);
  }
  async deleteOther(data: z.infer<typeof DeleteOtherPaymentSchema>): Promise<SmartbillResponse<PaymentResponse>> {
    const validated = DeleteOtherPaymentSchema.parse(data);
    return this.request.del<PaymentResponse>("/payment/v2", validated);
  }

  async deleteReceipt(data: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<PaymentResponse>> {
    const validated = DefaultUrlSchema.parse(data);
    return this.request.del<PaymentResponse>("/payment/chitanta", validated);
  }

  async getFiscalPrinterText(params:z.infer<typeof GetFiscalPrinterTextParamsSchema>): Promise<SmartbillResponse<PaymentResponse>> {
    return this.request.get<PaymentResponse>("/payment/text", params);
  }
}
