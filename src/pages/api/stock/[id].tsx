import type { NextApiRequest, NextApiResponse } from "next";

import { stock, stock_price } from "@prisma/client";

import { prismaClient } from "@/prismaClient";

import { formatStockTags } from "@/utils/stockUtils";
import { Stock } from "@/schema";

const stockPriceDateDaysBefore = ({
  stockPriceTimestamp,
  days,
}: {
  stockPriceTimestamp: Date;
  days: number;
}) => {
  const timestamp = stockPriceTimestamp;
  timestamp.setDate(timestamp.getDate() - days);

  return timestamp;
};

type Data = {
  data?: {
    stock: Stock;
    stockPrices: stock_price[];
  };
  error?: unknown;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const id = req.query.id as any;

    const stock = await prismaClient.stock.findUnique({ where: { id: id } });

    const firstStockPrice = await prismaClient.stock_price.findFirst({
      where: { stock_id: id },
      orderBy: { timestamp: "desc" },
    });

    const stockPrices = await prismaClient.stock_price.findMany({
      where: {
        stock_id: id,
        timestamp: {
          gte: stockPriceDateDaysBefore({
            stockPriceTimestamp: firstStockPrice!.timestamp!,
            days: 6,
          }),
        },
      },
      orderBy: {
        timestamp: "desc",
      },
    });

    res.status(200).json({
      data: { stock: formatStockTags([stock as stock])[0], stockPrices },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error });
  }
}
