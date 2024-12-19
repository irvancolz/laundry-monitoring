import { Order } from "@/type/laundry";
import Text from "./text";
import { Box, Chip, Stack } from "@mui/material";
import dayjs from "dayjs";

export default function OrderCard({ order }: { order: Order }) {
  return (
    <Box sx={{ p: ".75rem", backgroundColor: "#fff", borderRadius: ".4rem" }}>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          gap: ".5rem",
        }}
      >
        <Text
          sx={{
            color: "primary.main",
            fontWeight: 700,
            textTransform: "capitalize",
          }}
        >
          {order.customer_name}
        </Text>

        <Chip
          variant="outlined"
          sx={{
            borderRadius: ".5rem",
            fontWeight: 700,
            borderColor: "primary.main",
            color: "primary.main",
            p: ".25rem",
          }}
          label={order.current_progress}
        />
      </Stack>

      <Text sx={{ color: "primary.main", fontSize: ".9rem" }}>
        {order.service_name}
      </Text>
      <Stack
        direction="row"
        sx={{
          justifyContent: "space-between",
          alignItems: "flex-end",
          mt: ".5rem",
        }}
      >
        <Text sx={{ fontSize: ".6rem", color: "primary.main" }}>
          {order.code}
        </Text>
        <Text sx={{ fontSize: ".6rem", color: "primary.main" }}>
          {dayjs(order.created_at).format("DD MMM YYYY")}
        </Text>
      </Stack>
    </Box>
  );
}
