import { Box } from "@mui/material";
import Text from "./text";
import notFoundImg from "../public/empty-result.png";

export default function OrderNotFound() {
  return (
    <Box>
      <div
        style={{
          aspectRatio: 163 / 138,
          height: "138px",
          marginInline: "auto",
        }}
      >
        <img src={notFoundImg.src} alt="order not found" />
      </div>
      <div>
        <Text variant="h2" fontSize="1rem" textAlign="center" fontWeight={700}>
          Pesanan Tidak Ditemukan
        </Text>
        <Text textAlign="center">
          periksa nomor pesanan anda atau hubungi admin untuk informasi lebih
          lanjut
        </Text>
      </div>
    </Box>
  );
}
