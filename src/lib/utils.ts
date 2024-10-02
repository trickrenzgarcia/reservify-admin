import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function dateToday(date: Date): string {
  // Get the date in MM-DD-YYYY format
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  })
    .format(date)
    .replace(/\//g, "-");

  // Get the day of the week
  const dayOfWeek = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
  })
    .format(date)
    .toUpperCase();

  // Combine both parts
  return `${formattedDate} | ${dayOfWeek}`;
}
