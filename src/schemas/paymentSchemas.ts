import { z } from "zod";
import { ClientSchema, InvoiceListItemSchema } from "../schemas/shared";

export const PaymentSchema = z.object({
  value: z.number(),
  type: z.string(),
  isCash: z.boolean().optional(),
  paymentSeries: z.string().optional(),
  receivedCash: z.number().optional(),
  receivedCard: z.number().optional(),
  invoicesList: z.array(InvoiceListItemSchema).optional(),
  useInvoiceDetails: z.boolean().optional(),
  currency: z.string().optional(),
  exchangeRate: z.number().optional(),
  returnFiscalPrinterText: z.boolean().optional(),
  client: ClientSchema.optional(),
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
  paymentValue: z.number().optional(),
  clientName: z.string().optional(),
  clientCif: z.string().optional(),
  invoiceSeries: z.string(),
  invoiceNumber: z.string(),
});