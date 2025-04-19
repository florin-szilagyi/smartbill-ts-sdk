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

export { DefaultUrlSchema } from "./shared";