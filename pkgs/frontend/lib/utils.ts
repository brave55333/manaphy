import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// サブグラフのBase URL
export const BASE_GRAPHQL_URL = `https://api.studio.thegraph.com/query/44992/subgraph/"v0.0.1"`;
