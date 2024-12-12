"use client";
import {
  DateTimeField as BaseDatePicker,
  DateTimeFieldProps,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function DatePicker(props: DateTimeFieldProps<any>) {
  return (
    <BaseDatePicker referenceDate={dayjs("2022-04-17T15:30")} {...props} />
  );
}
