import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { StockInformation } from "@/pages/stock/[id]";

import { priceFormatter } from "@/utils/priceFormatter";
import { getStockChartData } from "@/utils/StockData/StockChartsData";

export const StockCharts = (props: StockInformation) => {
  const { stock, stockPrices } = props;

  const stockChart = getStockChartData({ stock, stockPrices });

  return (
    <div className="mt-4 flex flex-col gap-8">
      <div className="bg-slate-700 my-2 p-4">
        <h2>Price per minute (last 1 hour)</h2>
        <div className="w-[500px] h-[300px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={stockChart.pricesPerMinute}
            >
              <CartesianGrid />
              <XAxis hide dataKey="timestamp" />
              <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip
                formatter={(value) => [priceFormatter.format(Number(value))]}
                labelClassName="text-gray-600 text-base text-center"
              />
              <Line
                type="monotone"
                dataKey="price"
                stroke="#8884d8"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-700 my-2 p-4">
        <h2>Price per hour (last 24 hours)</h2>
        <div className="w-[500px] h-[300px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={stockChart.pricesPerHour}>
              <CartesianGrid />
              <XAxis dataKey="timestamp" />
              <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip
                formatter={(value) => [priceFormatter.format(Number(value))]}
                labelClassName="text-gray-600 text-base text-center"
              />
              <Line
                type="monotone"
                dataKey="price.max"
                stroke="#8884d8"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="price.min"
                stroke="#82ca9d"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-slate-700 my-2 p-4">
        <h2>Price per day (last 7 days)</h2>
        <div className="w-[500px] h-[300px] mt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart width={500} height={300} data={stockChart.pricesPerDay}>
              <CartesianGrid />
              <XAxis dataKey="timestamp" />
              <YAxis hide domain={["dataMin - 1", "dataMax + 1"]} />
              <Tooltip
                formatter={(value) => [priceFormatter.format(Number(value))]}
                labelClassName="text-gray-600 text-base text-center"
              />
              <Line
                type="monotone"
                dataKey="price.max"
                stroke="#8884d8"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="price.min"
                stroke="#82ca9d"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
