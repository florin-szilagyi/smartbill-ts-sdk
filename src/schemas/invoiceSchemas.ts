import { z } from "zod";
import { ClientSchema, ProductSchema } from "../schemas/shared";
import { EstimateRefSchema } from "./estimateSchemas";
import { EmailDetailsSchema } from "./shared";


import { PaymentSchema } from "./paymentSchemas";

export const CreateInvoiceParamsSchema = z.object({
  companyVatCode: z.string(),
  client: ClientSchema.optional().nullable(),
  products: z.array(ProductSchema).optional().nullable(),
  currency: z.string().optional().nullable(),
  issueDate: z.string().optional().nullable(),
  dueDate: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  isDraft: z.boolean().optional().nullable(),
  seriesName: z.string(),
  useEstimateDetails: z.boolean().optional().nullable(),
  estimate: EstimateRefSchema.optional().nullable(),
  useIntraCif: z.boolean().optional().nullable(),
  payment: PaymentSchema.optional().nullable(),
  sendEmail: z.boolean().optional().nullable(),
  email: EmailDetailsSchema.optional().nullable(),
  exchangeRate: z.number().optional().nullable(),
  useStock: z.boolean().optional().nullable(),
});