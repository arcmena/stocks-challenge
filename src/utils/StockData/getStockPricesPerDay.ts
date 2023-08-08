import { StockPrice } from "@/schema";
import { format, isAfter, subDays } from "date-fns";
import { minAndMaxMapToChartData } from "./getStockPricesPerHour";

const groupByDay = (stocksInLastWeek: StockPrice[]) => {
  const map = {} as Record<string, StockPrice[]>;

  stocksInLastWeek.forEach((item) => {
    const day = format(new Date(item.timestamp), "dd");

    if (!map[day]) {
      map[day] = [item];
    } else {
      map[day] = [...map[day], item];
    }
  });

  return map;
};

const getMinAndMaxByDay = (groupedByDay: Record<string, StockPrice[]>) => {
  const map = {} as Record<string, { min: number; max: number }>;

  Object.entries(groupedByDay).forEach(([key, value]) => {
    const prices = value.map((item) => item.price!);

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    map[key] = {
      min,
      max,
    };
  });

  return map;
};

export const getStockPricesPerDay = (stockPrices: StockPrice[]) => {
  const maxEntryDate = subDays(new Date(stockPrices[0].timestamp), 6);

  const stocksInLastWeek = stockPrices.reduce((prev, curr) => {
    if (isAfter(new Date(curr.timestamp), new Date(maxEntryDate))) {
      return [...prev, curr];
    }

    return prev;
  }, [] as StockPrice[]);

  const groupedByDay = groupByDay(stocksInLastWeek);
  const minAndMaxByDayMap = getMinAndMaxByDay(groupedByDay);

  const chartData = minAndMaxMapToChartData(minAndMaxByDayMap);

  return chartData;
};
