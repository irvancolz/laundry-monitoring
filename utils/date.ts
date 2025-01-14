import dayjs, { Dayjs } from "dayjs";

function currentTime(): string {
  return dayjs().format("DD/MM/YYYY HH:mm:ss");
}

function formatTime(dateTime: Dayjs): string {
  return dateTime.format("HH:mm");
}

function formatDateTime(dateTime: Dayjs): string {
  return dateTime.format("YYYY-MM-DD HH:mm");
}

export const date = { currentTime, formatTime, formatDateTime };
