import { z } from "zod";
import { ClientSchema, ProductSchema } from "../schemas/shared";
import { EstimateRefSchema } from "./estimateSchemas";
import { EmailDetailsSchema } from "./shared";


import { PaymentSchema } from "./paymentSchemas";

export const CreateInvoiceParamsSchema = z.object({
  companyVatCode: z.string(),
  client: ClientSchema.optional(),
  products: z.array(ProductSchema).optional(),
  currency: z.string().optional(),
  issueDate: z.string().optional(),
  dueDate: z.string().optional(),
  language: z.string().optional(),
  isDraft: z.boolean().optional(),
  seriesName: z.string(),
  useEstimateDetails: z.boolean().optional(),
  estimate: EstimateRefSchema.optional(),
  useIntraCif: z.boolean().optional(),
  payment: PaymentSchema.optional(),
  sendEmail: z.boolean().optional(),
  email: EmailDetailsSchema.optional(),
  exchangeRate: z.number().optional(),
  useStock: z.boolean().optional(),
});