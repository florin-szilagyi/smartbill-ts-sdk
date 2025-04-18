import { z } from "zod";
import { CreateEstimateParamsSchema, DefaultUrlSchema, SendEmailParamsSchema } from "../schemas/estimateSchemas";
import { EstimateResponse } from "../types/estimateTypes";
import { RequestMethods } from "../core/http";

export interface EstimateHandler {
  create(data: z.infer<typeof CreateEstimateParamsSchema>): Promise<EstimateResponse>;
  delete(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown>;
  getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<Buffer>;
  getInvoicingStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown>;
  cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown>;
  restore(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown>;
  sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<unknown>;
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

  async delete(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.del<unknown>("/estimate", validated);
  }

  async getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<Buffer> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.get<Buffer>("/estimate/pdf", validated);
  }

  async getInvoicingStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.get<unknown>("/estimate/invoices", validated);
  }

  async cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<unknown>("/estimate/cancel", validated);
  }

  async restore(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<unknown>("/estimate/restore", validated);
  }

  async sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<unknown> {
    const validated = SendEmailParamsSchema.parse(data);
    return this.request.post<unknown>("/estimate/send", validated);
  }
}
