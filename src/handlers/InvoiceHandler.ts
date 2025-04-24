import { z } from "zod";
import { CreateInvoiceParamsSchema, DefaultUrlSchema, DefaultSchema, SendEmailParamsSchema } from "../schemas";
import { RequestMethods } from "../core/http";

export interface InvoiceHandler {
  create(data: z.infer<typeof CreateInvoiceParamsSchema>): Promise<InvoiceResponse>;
  delete(params: z.infer<typeof DefaultUrlSchema>): Promise<InvoiceResponse>;
  getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<Buffer>;
  getPaymentStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<InvoicePaymentStatusResponse>;
  reverse(data: z.infer<typeof DefaultSchema>): Promise<InvoiceResponse>;
  cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<InvoiceResponse>;
  restore(params: z.infer<typeof DefaultUrlSchema>): Promise<InvoiceResponse>;
  sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<InvoiceResponse>;
}

export interface InvoiceResponse {
  series: string;
  number: string;
  errorText: string;
  message: string;
  url: string;
}

export interface InvoicePaymentStatusResponse extends InvoiceResponse {
  invoiceTotalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
  paid: boolean;
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

  async delete(params: z.infer<typeof DefaultUrlSchema>): Promise<InvoiceResponse> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.del<InvoiceResponse>("/invoice", validated);
  }

  async getPdf(params: z.infer<typeof DefaultUrlSchema>): Promise<Buffer> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.getBuffer("/invoice/pdf", validated);
  }

  async getPaymentStatus(params: z.infer<typeof DefaultUrlSchema>): Promise<InvoicePaymentStatusResponse> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.get<InvoicePaymentStatusResponse>("/invoice/paymentstatus", validated);
  }

  async reverse(data: z.infer<typeof DefaultSchema>): Promise<InvoiceResponse> {
    const validated = DefaultSchema.parse(data);
    return this.request.post<InvoiceResponse>("/invoice/reverse", validated);
  }

  async cancel(params: z.infer<typeof DefaultUrlSchema>): Promise<InvoiceResponse> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<InvoiceResponse>("/invoice/cancel", validated);
  }

  async restore(params: z.infer<typeof DefaultUrlSchema>): Promise<InvoiceResponse> {
    const validated = DefaultUrlSchema.parse(params);
    return this.request.put<InvoiceResponse>("/invoice/restore", validated);
  }

  async sendEmail(data: z.infer<typeof SendEmailParamsSchema>): Promise<InvoiceResponse> {
    const validated = SendEmailParamsSchema.parse(data);
    return this.request.post<InvoiceResponse>("/invoice/send", validated);
  }
}
