import { Inter } from "next/font/google";
import useSWR from "swr";
import { useRouter } from "next/router";

import { fetcher } from "@/utils/fetcher";

import { Stock, StockPrice } from "@/schema";
import { useStockChart } from "@/hooks/useStockChart";
import { StockCharts } from "@/components/StockCharts";

const inter = Inter({ subsets: ["latin"] });

export type StockInformation = {
  stock: Stock;
  stockPrices: StockPrice[];
};

type StockResponse = {
  data?: StockInformation;
};

export default function Home() {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, error, isLoading } = useSWR<StockResponse>(
    `/api/stock/${id}`,
    id ? fetcher : null
  );

  const stockData = data?.data;

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 bg-slate-800 text-white ${inter.className}`}
    >
      {isLoading && <h1>Loading stock data...</h1>}

      {error && <h1>An error ocurred while fetching stock data</h1>}

      {stockData && (
        <>
          <h1>{stockData.stock.name}</h1>
          <StockCharts {...stockData} />
        </>
      )}
    </main>
  );
}
