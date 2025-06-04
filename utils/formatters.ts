import dayjs from "dayjs";

export function getDuration(date: string, prefix?: string): string {
  const now = dayjs();
  const input = dayjs(new Date(Number(date)));
  const minutesDiff = now.diff(input, "minute");
  const description = prefix ? `${prefix} ` : "";

  if (minutesDiff < 1) return `${description}just now`;
  if (minutesDiff < 60)
    return `${description}${minutesDiff} minute${
      minutesDiff > 1 ? "s" : ""
    } ago`;

  const hoursDiff = now.diff(input, "hour");
  if (hoursDiff < 24)
    return `${description}${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;

  const daysDiff = now.diff(input, "day");
  if (daysDiff === 1) return `${description}yesterday`;
  return `${description} ${daysDiff} days ago`;
}

export function getTimeLabel(date?: string): string {
  if (!date) return "";
  const input = dayjs(new Date(Number(date)));
  const now = dayjs();

  if (input.isSame(now, "day")) {
    return input.format("HH:mm");
  }

  if (input.isSame(now.subtract(1, "day"), "day")) {
    return "Yesterday";
  }

  return input.format("DD/MM");
}
