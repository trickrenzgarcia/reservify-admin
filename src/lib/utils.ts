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

  // Get the time (with hours, minutes, and seconds)
  const formattedTime = new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  }).format(date);

  // Combine both parts
  return `${formattedDate} | ${dayOfWeek} | ${formattedTime}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based, so add 1
  const day = String(date.getDate()).padStart(2, "0");
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
}
