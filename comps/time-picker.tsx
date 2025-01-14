import {
  TimePicker as BaseTimePicker,
  TimePickerProps,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
export default function TimePicker({
  value = dayjs(),
  ...rest
}: TimePickerProps<any>) {
  return <BaseTimePicker ampm={false} value={value} {...rest} />;
}
