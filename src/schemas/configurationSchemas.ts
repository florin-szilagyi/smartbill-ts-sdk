import { z } from "zod";

export const VatTaxRatesParamsSchema = z.object({ cif: z.string() });

export const SeriesParamsSchema = z.object({
  cif: z.string(),
  type: z.string().optional(),
});
