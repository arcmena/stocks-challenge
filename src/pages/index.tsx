import { Inter } from "next/font/google";
import useSWR from "swr";
import Link from "next/link";
import { useMemo, useState } from "react";

import { fetcher } from "@/utils/fetcher";
import { priceFormatter } from "@/utils/priceFormatter";

import { Stock } from "@/schema";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data, error, isLoading } = useSWR<{ data: Stock[] }>(
    "/api/stocks",
    fetcher
  );

  const stockData = data?.data;

  const [filter, setFilter] = useState("");

  const stockList = useMemo(() => {
    if (filter && stockData) {
      return stockData.filter((stock) =>
        stock
          .tags!.map((tag) => tag.toLocaleLowerCase())!
          .some((item) => item.includes(filter.toLocaleLowerCase()))
      );
    }

    return stockData;
  }, [filter, stockData]);

  const updateFilter = (e: any) => {
    setFilter(e.target.value);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 bg-slate-800 text-white ${inter.className}`}
    >
      <div className="my-auto">
        {isLoading && <h1>Loading stocks data...</h1>}

        {error && <h1>An error ocurred while fetching stocks data</h1>}

        {stockData && (
          <div>
            <h1 className="text-xl">Stocks availabe:</h1>

            <div className="my-4">
              <label htmlFor="filter" className="mr-4">
                Filter:
              </label>
              <input
                type="text"
                id="filter"
                placeholder="Filter by tags"
                onChange={updateFilter}
                className="text-slate-900 p-2"
              />
            </div>

            <ul className="mt-4">
              {stockList && stockList?.length !== 0
                ? stockList.map((stock) => (
                    <li key={stock.id}>
                      <Link
                        href={`/stock/${stock.id}`}
                        className="grid grid-cols-2 gap-10 bg-slate-700 my-2 p-4 hover:bg-slate-600 cursor-pointer"
                      >
                        <p>{stock.name}</p>
                        <span className="text-right">
                          {priceFormatter.format(Number(stock.current_price))}
                        </span>
                      </Link>
                    </li>
                  ))
                : "No Stocks found"}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
