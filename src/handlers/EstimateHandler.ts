import { z } from "zod";
import { CreateEstimateParamsSchema, DefaultUrlSchema, SendEmailParamsSchema } from "../schemas";
import { RequestMethods } from "../core/http";

export interface EstimateHandler {
  create(data: z.infer<typeof CreateEstimateParamsSchema>): Promise<EstimateResponse>;
  delete(params: z.infer<typeof DefaultUrlSchema>): Promise<EstimateResponse>;
  getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<Buffer>;
  getInvoicingStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<EstimateResponse>;
  cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<EstimateResponse>;
  restore(params: z.infer<typeof DefaultUrlSchema>): Promise<EstimateResponse>;
  sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<EstimateResponse>;
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

  async create(data: z.infer<typeof CreateEstimateParamsSchema>): Promise<EstimateResponse> {
    const validated = CreateEstimateParamsSchema.parse(data);
    return this.request.post<EstimateResponse>("/estimate", validated);
  }

  async delete(params: z.infer<typeof DefaultUrlSchema>): Promise<EstimateResponse> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.del<EstimateResponse>("/estimate", validated);
  }

  async getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<Buffer> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.getBuffer("/estimate/pdf", validated);
  }

  async getInvoicingStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<EstimateInvoiceResponse> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.get<EstimateInvoiceResponse>("/estimate/invoices", validated);
  }

  async cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<EstimateResponse> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<EstimateResponse>("/estimate/cancel", validated);
  }

  async restore(params: z.infer<typeof DefaultUrlSchema>): Promise<EstimateResponse> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<EstimateResponse>("/estimate/restore", validated);
  }

  async sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<EstimateResponse> {
    const validated = SendEmailParamsSchema.parse(data);
    return this.request.post<EstimateResponse>("/estimate/send", validated);
  }
}
