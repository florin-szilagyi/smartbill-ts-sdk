import { SmartBillSDK } from '../src';
import { ClientSchema, ProductSchema } from '../src/schemas';
import { CreateEstimateParamsSchema } from '../src/schemas/estimateSchemas';
import dotenv from 'dotenv';
import { z } from 'zod';
import { describe, it, expect } from 'vitest';

dotenv.config();

const email = process.env.SMARTBILL_EMAIL!;
const token = process.env.SMARTBILL_TOKEN!;
const companyVatCode = process.env.SMARTBILL_COMPANY_VAT_CODE!;
const estimateSeriesName = process.env.SMARTBILL_ESTIMATE_SERIES_NAME!;
const today = new Date().toISOString().slice(0, 10);

const sdk = new SmartBillSDK({
  email,
  token,
  verbose: true,
});

const baseClient = {
  name: 'Test Client API',
  vatCode: 'RO12345678',
  isTaxPayer: true,
  address: 'Str. Test nr. 1',
  city: 'Bucuresti',
  county: 'Bucuresti',
  country: 'Romania',
  email: 'test@example.com',
  saveToDb: false,
};

const baseProduct = {
  name: 'Produs 1',
  measuringUnitName: 'buc',
  currency: 'RON',
  quantity: 1,
  price: 10,
  saveToDb: false,
  isService: false,
  taxName: 'Normala',
  taxPercentage: 19
};

const discountedProduct = {
  name: 'Discount procentual Produs 1',
  isDiscount: true,
  quantity: 2,
  price: 5,
  numberOfItems: 1,
  measuringUnitName: 'buc',
  currency: 'RON',
  isTaxIncluded: true,
  taxName: 'Normala',
  taxPercentage: 19,
  discountType: 2,
  discountPercentage: 10,
};

describe('Proforme API Tests', () => {
  it('Emitere proforma firma neplatitoare de TVA', async () => {
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      dueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      products: [baseProduct],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma ciorna', async () => {
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      dueDate: today,
      seriesName: estimateSeriesName,
      isDraft: true,
      products: [baseProduct],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma simpla - produse fara cod', async () => {
    const product = { ...baseProduct, code: undefined };
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      dueDate: today,
      seriesName: estimateSeriesName,
      products: [product],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma simpla - produse cu cod', async () => {
    const product = { ...baseProduct, code: 'codProdus1' };
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      products: [product],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma simpla - produse cu descriere', async () => {
    const product = { ...baseProduct, productDescription: 'conform contract nr. 10/2022 pentru luna mai' };
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      dueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      products: [product],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma cu servicii', async () => {
    const product = { ...baseProduct, name: 'Abonament lunar', isService: true };
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      dueDate: today,
      products: [product],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma cu returnarea linkului public al facturii', async () => {
    const product = { ...baseProduct, name: 'Abonament lunar', isService: true };
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      dueDate: today,
      products: [product],
    };
    const response = await sdk.estimates.create(payload); // If you have sdk.estimates.createV2, use it
    expect(response).toBeDefined();
    // Optionally: expect(response.documentUrl).toBeDefined();
  });

  it('Emitere proforma cu CIF intracomunitar', async () => {
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      useIntraCif: true,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      dueDate: today,
      products: [baseProduct],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma cu link de plata', async () => {
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      dueDate: today,
      paymentUrl: 'Generate URL',
      products: [baseProduct],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
    // Optionally: expect(response.url).toBeDefined();
  });

  it('Emitere proforma cu discount valoric', async () => {
    const product = { ...baseProduct };
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      dueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      products: [product, discountedProduct],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma cu discount procentual', async () => {
    const product = { ...baseProduct };
    
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      dueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      products: [product, discountedProduct],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it.skip('Emitere proforma si trimiterea ei pe email clientului ca atasament + link catre proforma', async () => {
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      dueDate: today,
      sendEmail: true,
      email: {
        to: 'test@example.com',
      },
      products: [baseProduct],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma in valuta', async () => {
    const product = { ...baseProduct, currency: 'EUR' };
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      dueDate: today,
      currency: 'EUR',
      exchangeRate: 4.47,
      products: [product],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma pentru produse cu pretul de referinta in valuta', async () => {
    const products = [
      {
        ...baseProduct,
        code: 'ccd1',
        productDescription: 'produs cu pretul de referinta in EUR',
        currency: 'EUR',
        exchangeRate: 4.47,
        quantity: 2,
        price: 10,
      },
      {
        ...baseProduct,
        code: 'ccd2',
        productDescription: 'produs cu pretul de referinta in USD',
        currency: 'USD',
        exchangeRate: 4.15,
        quantity: 2,
        price: 15,
      },
      {
        ...baseProduct,
        code: 'ccd3',
        productDescription: 'produs cu pretul de referinta in RON',
        currency: 'RON',
        quantity: 5,
        price: 10,
      },
    ];
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      dueDate: today,
      deliveryDate: today,
      products,
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  it('Emitere proforma in limba straina', async () => {
    const product = {
      ...baseProduct,
      translatedName: 'Product 1',
      translatedMeasuringUnit: 'piece',
    };
    const payload: z.infer<typeof CreateEstimateParamsSchema> = {
      companyVatCode,
      client: baseClient,
      issueDate: today,
      seriesName: estimateSeriesName,
      isDraft: false,
      dueDate: today,
      language: 'EN',
      products: [product],
    };
    const response = await sdk.estimates.create(payload);
    expect(response).toBeDefined();
  });

  // PDF download and status check tests can be implemented similarly if SDK supports them
});