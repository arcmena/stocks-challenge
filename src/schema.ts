export type Stock = {
  id: string;
  current_price?: number | null;
  name?: string | null;
  symbol?: string | null;
  tags?: Array<string> | null;
};

export type StockPrice = {
  stock_id: string;
  price: number | null;
  timestamp: Date;
};
