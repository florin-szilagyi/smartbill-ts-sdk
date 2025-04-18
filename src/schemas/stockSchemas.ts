import { z } from "zod";

export const StocksParamsSchema = z.object({
  cif: z.string(),
  date: z.string(),
  warehouseName: z.string().optional(),
  productName: z.string().optional(),
  productCode: z.string().optional(),
});
