import { z } from "zod";
import { ClientSchema, InvoiceListItemSchema } from "../schemas/shared";

export const PaymentSchema = z.object({
  value: z.number(),
  type: z.string(),
  isCash: z.boolean().optional().nullable(),
  paymentSeries: z.string().optional().nullable(),
  receivedCash: z.number().optional().nullable(),
  receivedCard: z.number().optional().nullable(),
  invoicesList: z.array(InvoiceListItemSchema).optional().nullable(),
  useInvoiceDetails: z.boolean().optional().nullable(),
  currency: z.string().optional().nullable(),
  exchangeRate: z.number().optional().nullable(),
  returnFiscalPrinterText: z.boolean().optional().nullable(),
  client: ClientSchema.optional().nullable(),
});

export const GetFiscalPrinterTextParamsSchema = z.object({
  id: z.string(),
  cif: z.string(),
});

export const DeleteOtherPaymentSchema = z.object({
  cif: z.string(),
  seriesname: z.string(),
  number: z.string(),
  paymentType: z.enum(["Card", "CEC", "Bilet  ordin", "Ordin plata", "Mandat postal", "Alta incasare"]),
  paymentValue: z.number().optional().nullable(),
  clientName: z.string().optional().nullable(),
  clientCif: z.string().optional().nullable(),
  invoiceSeries: z.string(),
  invoiceNumber: z.string(),
});