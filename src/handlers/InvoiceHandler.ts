import { z } from "zod";
import { CreateInvoiceParamsSchema, DefaultUrlSchema, DefaultSchema, SendEmailParamsSchema } from "../schemas/invoiceSchemas";
import { InvoiceResponse } from "../types/invoiceTypes";
import { RequestMethods } from "../core/http";

export interface InvoiceHandler {
  create(data: z.infer<typeof CreateInvoiceParamsSchema>): Promise<InvoiceResponse>;
  delete(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown>;
  getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<Buffer>;
  getPaymentStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown>;
  reverse(data: z.infer<typeof DefaultSchema>): Promise<unknown>;
  cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown>;
  restore(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown>;
  sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<unknown>;
}

export class InvoiceHandlerImpl implements InvoiceHandler {
  private request: RequestMethods;

  constructor(requestMethods: RequestMethods) {
    this.request = requestMethods;
  }

  async create(data: z.infer<typeof CreateInvoiceParamsSchema>): Promise<InvoiceResponse> {
    const validated = CreateInvoiceParamsSchema.parse(data);
    return this.request.post<InvoiceResponse>("/invoice", validated);
  }

  async delete(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.del<unknown>("/invoice", validated);
  }

  async getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<Buffer> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.get<Buffer>("/invoice/pdf", validated);
  }

  async getPaymentStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.get<unknown>("/invoice/paymentstatus", validated);
  }

  async reverse(data: z.infer<typeof DefaultSchema>): Promise<unknown> {
    const validated = DefaultSchema.parse(data);
    return this.request.post<unknown>("/invoice/reverse", validated);
  }

  async cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<unknown>("/invoice/cancel", validated);
  }

  async restore(params: z.infer<typeof DefaultUrlSchema>): Promise<unknown> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<unknown>("/invoice/restore", validated);
  }

  async sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<unknown> {
    const validated = SendEmailParamsSchema.parse(data);
    return this.request.post<unknown>("/invoice/send", validated);
  }
}
