import { StockInformation } from "@/pages/stock/[id]";

import { getStockPricePerMinute } from "./getStockPricePerMinute";
import { getStockPricesPerHour } from "./getStockPricesPerHour";
import { getStockPricesPerDay } from "./getStockPricesPerDay";

export const getStockChartData = (stockInfo: StockInformation) => {
  const pricesPerMinute = getStockPricePerMinute(stockInfo.stockPrices);
  const pricesPerHour = getStockPricesPerHour(stockInfo.stockPrices);
  const pricesPerDay = getStockPricesPerDay(stockInfo.stockPrices);

  return {
    pricesPerMinute,
    pricesPerHour,
    pricesPerDay,
  };
};
