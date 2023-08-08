import { StockPrice } from "@/schema";
import { format, isSameHour, subHours } from "date-fns";

const stockPricesToSimpleChartData = (stockPrices: StockPrice[]) => {
  const formatedTimestamps = stockPrices.map((stock) => ({
    price: stock.price?.toFixed(2),
    timestamp: format(new Date(stock.timestamp), "hh:mmb"),
  }));

  return formatedTimestamps;
};

export const getStockPricePerMinute = (stockPrices: StockPrice[]) => {
  const maxEntryDate = subHours(new Date(stockPrices[0].timestamp), 1);

  const stocksInLastHour = stockPrices.reduce((prev, curr) => {
    if (isSameHour(new Date(curr.timestamp), new Date(maxEntryDate))) {
      return [...prev, curr];
    }

    return prev;
  }, [] as StockPrice[]);

  const sorted = [...stocksInLastHour].sort((a, b) =>
    new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1
  );

  return stockPricesToSimpleChartData(sorted);
};
