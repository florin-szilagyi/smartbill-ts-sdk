import { z } from "zod";

export const ClientSchema = z.object({
  name: z.string(),
  vatCode: z.string().optional().nullable(),
  regComNumber: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  city: z.string().optional().nullable(),
  county: z.string().optional().nullable(),
  country: z.string(),
  bank: z.string().optional().nullable(),
  iban: z.string().optional().nullable(),
  contact: z.string().optional().nullable(),
  phone: z.string().optional().nullable(),
  email: z.string().email().optional().nullable(),
  isTaxPayer: z.boolean().optional().nullable(),
  saveToDb: z.boolean().optional().nullable(),
});

export const EmailDetailsSchema = z.object({
  to: z.string().email().optional().nullable(),
  cc: z.string().email().optional().nullable(),
  bcc: z.string().email().optional().nullable(),
  subject: z.string().base64().optional().nullable(),
  bodyText: z.string().base64().optional().nullable(),
});

export const ProductSchema = z.object({
  name: z.string(),
  code: z.string().optional().nullable(),
  productDescription: z.string().optional().nullable(),
  measuringUnitName: z.string(),
  currency: z.string().optional().nullable(),
  quantity: z.number(),
  price: z.number(),
  isTaxIncluded: z.boolean().optional().nullable(),
  taxName: z.string().optional().nullable(),
  taxPercentage: z.number(),
  saveToDb: z.boolean().optional().nullable(),
  isService: z.boolean().optional().nullable(),
  warehouseName: z.string().optional().nullable(),
  translatedName: z.string().optional().nullable(),
  translatedMeasuringUnit: z.string().optional().nullable(),
  isDiscount: z.boolean().optional().nullable(),
  numberOfItems: z.number().optional().nullable(),
  discountType: z.number().optional().nullable(),
  discountValue: z.number().optional().nullable(),
  discountPercentage: z.number().optional().nullable(),
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
  subject: z.string().optional().nullable(),
  to: z.string().email(),
  bodyText: z.string().optional().nullable(),
});

export const InvoiceListItemSchema = z.object({
  seriesName: z.string(),
  number: z.string(),
});