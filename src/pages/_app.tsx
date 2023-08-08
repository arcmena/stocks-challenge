// @ts-ignore
BigInt.prototype.toJSON = function (): string {
  return this.toString();
};

import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
