import type { Tax } from "./Tax";

export interface Asset {
    id: number;
    name: string;
    tickerSymbol: string;
    shares: number;
    shareValue: number;
    tax: Tax;
}
