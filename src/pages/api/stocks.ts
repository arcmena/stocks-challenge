import type { NextApiRequest, NextApiResponse } from "next";

import { prismaClient } from "@/prismaClient";
import { formatStockTags } from "@/utils/stockUtils";

import { Stock } from "@/schema";

type Data = {
  data?: Stock[];
  error?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const stocks = await prismaClient.stock.findMany();

    res.status(200).json({ data: formatStockTags(stocks) });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
}
