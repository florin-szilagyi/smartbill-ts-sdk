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
export const EstimateRefSchema = z.object({
  seriesName: z.string(),
  number: z.string(),
});
export const InvoiceListItemSchema = z.object({
  seriesName: z.string(),
  number: z.string(),
});

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
export const DefaultSchema = z.object({
  companyVatCode: z.string(),
  seriesName: z.string(),
  number: z.string(),
});

export const DefaultUrlSchema = z.object({
  cif: z.string(),
  seriesname: z.string(),
  number: z.string(),
});

export const CreateInvoiceParamsSchema = z.object({
  companyVatCode: z.string(),
  client: ClientSchema,
  products: z.array(ProductSchema),
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
  withholdingTaxPercentage: z.number().optional(),
});

// --- Zod Schemas for info endpoints ---
export const VatTaxRatesParamsSchema = z.object({ cif: z.string() });
export const SeriesParamsSchema = z.object({
  cif: z.string(),
  type: z.string().optional(),
});
export const StocksParamsSchema = z.object({
  cif: z.string(),
  date: z.string(),
  warehouseName: z.string().optional(),
  productName: z.string().optional(),
  productCode: z.string().optional(),
});
