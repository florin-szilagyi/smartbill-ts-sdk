import { SmartBillSDK } from '../src';
import dotenv from 'dotenv';
import { z } from 'zod';
import { describe, it, expect } from 'vitest';
import { SeriesParamsSchema, VatTaxRatesParamsSchema } from '../src/schemas';

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


describe('Configurari API Tests', () => {
  it('Returns document series', async () => {
    const payload: z.infer<typeof SeriesParamsSchema> = {
      cif: companyVatCode,
    };
    const response = await sdk.configuration.getDocumentSeries(payload);
    expect(response).toBeDefined();
  });

  it('Returns document series -- facturi', async () => {
    const payload: z.infer<typeof SeriesParamsSchema> = {
      cif: companyVatCode,
      type: 'f'
    };
    const response = await sdk.configuration.getDocumentSeries(payload);
    expect(response).toBeDefined();
  });

  
  it('Returns document series -- proforme', async () => {
    const payload: z.infer<typeof SeriesParamsSchema> = {
      cif: companyVatCode,
      type: 'p'
    };
    const response = await sdk.configuration.getDocumentSeries(payload);
    expect(response).toBeDefined();
  });

  
  it('Returns document series -- chitante', async () => {
    const payload: z.infer<typeof SeriesParamsSchema> = {
      cif: companyVatCode,
      type: 'c'
    };
    const response = await sdk.configuration.getDocumentSeries(payload);
    expect(response).toBeDefined();
  });


  it('Returns VAT tax rates', async () => {
    const payload: z.infer<typeof VatTaxRatesParamsSchema> = {
      cif: companyVatCode,
    };
    const response = await sdk.configuration.getVatTaxRates(payload);
    expect(response).toBeDefined();
  });
});