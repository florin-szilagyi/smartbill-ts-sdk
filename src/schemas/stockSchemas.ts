import { z } from "zod";

export const StocksParamsSchema = z.object({
  cif: z.string(),
  date: z.string(),
  warehouseName: z.string().optional().nullable(),
  productName: z.string().optional().nullable(),
  productCode: z.string().optional().nullable(),
});
