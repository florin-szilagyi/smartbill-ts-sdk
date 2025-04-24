import { z } from "zod";

export const VatTaxRatesParamsSchema = z.object({ cif: z.string() });

export const SeriesParamsSchema = z.object({
  cif: z.string(),
  type: z.enum(["f", "p", "c"]).optional().nullable(),
});

// --- Interfaces for ConfigurationHandler responses ---

// /tax endpoint
export interface Tax {
  name: string;
  percentage: number;
}

export interface TaxResponse {
  errorText: string;
  message: string;
  number: string;
  series: string;
  url: string;
  taxes: Tax[];
}

// /series endpoint
export interface SeriesItem {
  name: string;
  nextNumber: number;
  type: string;
}

export interface SeriesResponse {
  errorText: string;
  message: string;
  number: string;
  series: string;
  url: string;
  list: SeriesItem[];
}
