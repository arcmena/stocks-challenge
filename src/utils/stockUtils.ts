import { stock } from "@prisma/client";

const formatTags = (tags: string) => {
  const stringObjectToItems = tags.replace("{", "").replace("}", "");
  const arrayItems = stringObjectToItems.split(",");

  return arrayItems;
};

export const formatStockTags = (stocks: stock[]) =>
  stocks.map((stock) => ({
    ...stock,
    id: String(stock.id),
    tags: formatTags(stock.tags!),
  }));
