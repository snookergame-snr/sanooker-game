import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGradientClassName(startColor: string, endColor: string): string {
  return `bg-gradient-to-r from-${startColor} to-${endColor}`;
}

export function formatNumber(number: number): string {
  return new Intl.NumberFormat().format(number);
}

export function shortenAddress(address: string, chars = 4): string {
  if (!address) return '';
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`;
}
