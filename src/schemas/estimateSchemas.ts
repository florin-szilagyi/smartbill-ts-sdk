import { z } from "zod";
import { ClientSchema, EmailDetailsSchema, ProductSchema } from "../schemas/shared";


export const CreateEstimateParamsSchema = z.object({
  companyVatCode: z.string(),
  client: ClientSchema,
  products: z.array(ProductSchema),
  currency: z.string().optional().nullable(),
  issueDate: z.string().optional().nullable(),
  dueDate: z.string().optional().nullable(),
  language: z.string().optional().nullable(),
  isDraft: z.boolean().optional().nullable(),
  seriesName: z.string(),
  useIntraCif: z.boolean().optional().nullable(),
  sendEmail: z.boolean().optional().nullable(),
  email: EmailDetailsSchema.optional().nullable(),
  paymentUrl: z.string().optional().nullable(),
  deliveryDate: z.string().optional().nullable(),
  exchangeRate: z.number().optional().nullable(),
});

export const EstimateRefSchema = z.object({
    seriesName: z.string(),
    number: z.string(),
  });