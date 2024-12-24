import dayjs from "dayjs";

function currentTime(): string {
  return dayjs().format("DD/MM/YYYY HH:mm:ss");
}
export const date = { currentTime };
