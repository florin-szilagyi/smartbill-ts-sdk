import { z } from "zod";
import { ClientSchema, EmailDetailsSchema, ProductSchema } from "../schemas/shared";


export const CreateEstimateParamsSchema = z.object({
  companyVatCode: z.string(),
  client: ClientSchema,
  products: z.array(ProductSchema),
  currency: z.string().optional(),
  issueDate: z.string().optional(),
  dueDate: z.string().optional(),
  language: z.string().optional(),
  isDraft: z.boolean().optional(),
  seriesName: z.string(),
  useIntraCif: z.boolean().optional(),
  sendEmail: z.boolean().optional(),
  email: EmailDetailsSchema.optional(),
  paymentUrl: z.string().optional(),
  deliveryDate: z.string().optional(),
  exchangeRate: z.number().optional(),
});

export const EstimateRefSchema = z.object({
    seriesName: z.string(),
    number: z.string(),
  });

export { ClientSchema, ProductSchema };
export * from "./shared";