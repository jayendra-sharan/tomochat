import dayjs from "dayjs";

export function getConnectionDuration(date: string): string {
  const now = dayjs();
  const input = dayjs(new Date(Number(date)));
  const minutesDiff = now.diff(input, "minute");

  if (minutesDiff < 1) return "Connected just now";
  if (minutesDiff < 60)
    return `Connected ${minutesDiff} minute${minutesDiff > 1 ? "s" : ""} ago`;

  const hoursDiff = now.diff(input, "hour");
  if (hoursDiff < 24)
    return `Connected ${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;

  const daysDiff = now.diff(input, "day");
  if (daysDiff === 1) return "Connected yesterday";
  return `Connected ${daysDiff} days ago`;
}
