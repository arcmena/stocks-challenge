import { format, isAfter, subDays } from "date-fns";

import { StockPrice } from "@/schema";

const groupByHour = (stocksInLastDay: StockPrice[]) => {
  const map = {} as Record<string, StockPrice[]>;

  stocksInLastDay.forEach((item) => {
    const hour = format(new Date(item.timestamp), "HH");

    if (!map[hour]) {
      map[hour] = [item];
    } else {
      map[hour] = [...map[hour], item];
    }
  });

  return map;
};

const getMinAndMaxByHour = (groupedByHourMap: Record<string, StockPrice[]>) => {
  const map = {} as Record<string, { min: number; max: number }>;

  Object.entries(groupedByHourMap).forEach(([key, value]) => {
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

export const minAndMaxMapToChartData = (
  minAndMaxByHourMap: Record<
    string,
    {
      min: number;
      max: number;
    }
  >
): Array<{ price: { min: number; max: number }; timestamp: string }> => {
  const chartData = Object.entries(minAndMaxByHourMap).map(([key, value]) => ({
    timestamp: key,
    price: {
      min: Number(value.min.toFixed(2)),
      max: Number(value.max.toFixed(2)),
    },
  }));

  const sortedChartData = chartData.sort((a, b) =>
    Number(a.timestamp) < Number(b.timestamp) ? -1 : 1
  );

  return sortedChartData;
};

export const getStockPricesPerHour = (stockPrices: StockPrice[]) => {
  const maxEntryDate = subDays(new Date(stockPrices[0].timestamp), 1);

  const stocksInLastDay = stockPrices.reduce((prev, curr) => {
    if (isAfter(new Date(curr.timestamp), new Date(maxEntryDate))) {
      return [...prev, curr];
    }

    return prev;
  }, [] as StockPrice[]);

  const groupedByHourMap = groupByHour(stocksInLastDay);
  const minAndMaxByHourMap = getMinAndMaxByHour(groupedByHourMap);

  const chartData = minAndMaxMapToChartData(minAndMaxByHourMap);

  return chartData;
};
