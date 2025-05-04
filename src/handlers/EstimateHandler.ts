import { z } from "zod";
import { CreateEstimateParamsSchema, DefaultUrlSchema, SendEmailParamsSchema } from "../schemas";
import { RequestMethods } from "../core/http";
import { SmartbillResponse } from "../core/SmartBillSDK";

export interface EstimateHandler {
  create(data: z.infer<typeof CreateEstimateParamsSchema>): Promise<SmartbillResponse<EstimateResponse>>;
  delete(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<EstimateResponse>>;
  getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<Buffer>>;
  getInvoicingStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<EstimateResponse>>;
  cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<EstimateResponse>>;
  restore(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<EstimateResponse>>;
  sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<SmartbillResponse<EstimateResponse>>;
}

export interface EstimateResponse {
  series: string;
  number: string;
  errorText: string;
  message: string;
}

export interface EstimateInvoiceResponse extends EstimateResponse {
  areInvoicesCreated: boolean;
}

export class EstimateHandlerImpl implements EstimateHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods) {
    this.request = requestMethods;
  }

  async create(data: z.infer<typeof CreateEstimateParamsSchema>): Promise<SmartbillResponse<EstimateResponse>> {
    const validated = CreateEstimateParamsSchema.parse(data);
    return this.request.post<EstimateResponse>("/estimate", validated);
  }

  async delete(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<EstimateResponse>> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.del<EstimateResponse>("/estimate", validated);
  }

  async getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<Buffer>> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.getBuffer("/estimate/pdf", validated);
  }

  async getInvoicingStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<EstimateInvoiceResponse>> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.get<EstimateInvoiceResponse>("/estimate/invoices", validated);
  }

  async cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<EstimateResponse>> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<EstimateResponse>("/estimate/cancel", validated);
  }

  async restore(params: z.infer<typeof DefaultUrlSchema>): Promise<SmartbillResponse<EstimateResponse>> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<EstimateResponse>("/estimate/restore", validated);
  }

  async sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<SmartbillResponse<EstimateResponse>> {
    const validated = SendEmailParamsSchema.parse(data);
    return this.request.post<EstimateResponse>("/estimate/send", validated);
  }
}
