import { z } from "zod";

export const ClientSchema = z.object({
  name: z.string(),
  vatCode: z.string().optional(),
  regComNumber: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  county: z.string().optional(),
  country: z.string(),
  bank: z.string().optional(),
  iban: z.string().optional(),
  contact: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  isTaxPayer: z.boolean().optional(),
  saveToDb: z.boolean().optional(),
});

export const EmailDetailsSchema = z.object({
  to: z.string().email().optional(),
  cc: z.string().email().optional(),
  bcc: z.string().email().optional(),
  subject: z.string().base64().optional(),
  bodyText: z.string().base64().optional(),
});

export const ProductSchema = z.object({
  name: z.string(),
  code: z.string().optional(),
  productDescription: z.string().optional(),
  measuringUnitName: z.string(),
  currency: z.string().optional(),
  quantity: z.number(),
  price: z.number(),
  isTaxIncluded: z.boolean().optional(),
  taxName: z.string().optional(),
  taxPercentage: z.number(),
  saveToDb: z.boolean().optional(),
  isService: z.boolean().optional(),
  warehouseName: z.string().optional(),
  translatedName: z.string().optional(),
  translatedMeasuringUnit: z.string().optional(),
  isDiscount: z.boolean().optional(),
  numberOfItems: z.number().optional(),
  discountType: z.number().optional(),
  discountValue: z.number().optional(),
  discountPercentage: z.number().optional(),
});


export const DefaultUrlSchema = z.object({
  cif: z.string(),
  seriesname: z.string(),
  number: z.string(),
});


export const DefaultSchema = z.object({
  companyVatCode: z.string(),
  seriesName: z.string(),
  number: z.string(),
});


export const SendEmailParamsSchema = z.object({
  companyVatCode: z.string(),
  seriesName: z.string(),
  number: z.string(),
  type: z.string(),
  subject: z.string().optional(),
  to: z.string().email(),
  bodyText: z.string().optional(),
});

export const InvoiceListItemSchema = z.object({
  seriesName: z.string(),
  number: z.string(),
});