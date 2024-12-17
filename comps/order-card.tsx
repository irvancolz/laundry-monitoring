import { Order } from "@/type/laundry";
import Text from "./text";
import { Box, Chip, Stack } from "@mui/material";

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
        <Text sx={{ color: "primary.main", fontSize: ".8rem" }}>
          {order.code}
        </Text>
        <Chip
          variant="outlined"
          sx={{
            borderRadius: ".5rem",
            fontWeight: 700,
            borderColor: "primary.main",
            color: "primary.main",
          }}
          label={order.current_progress}
        />
      </Stack>
      <Text sx={{ color: "primary.main", fontWeight: 700 }}>
        {order.customer_name}
      </Text>
      <Text sx={{ color: "primary.main", fontWeight: 700, fontSize: ".9rem" }}>
        {order.service_name}
      </Text>
    </Box>
  );
}
