"use client";
import { api } from "@/api";
import Button from "@/comps/button";
import ServiceCard from "@/comps/service-card";
import Text from "@/comps/text";
import TextInput from "@/comps/text-input";
import Topbar from "@/comps/topbar";
import { LaundryService } from "@/type/laundry";
import { Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const [services, setServices] = useState<LaundryService[]>([]);
  const [query, setQuery] = useState<string>("");

  useEffect(() => {
    async function getServices() {
      const resp = await api.laundryService.getAll();
      setServices(() => resp);
    }

    getServices();
  }, []);
  return (
    <>
      <Topbar />
      <Stack sx={{ flexGrow: 1, gap: "1rem", marginTop: "2rem" }}>
        <Text
          variant="h1"
          component="h1"
          sx={{ fontSize: "1.5rem", fontWeight: 700 }}
        >
          Layanan Tersedia
        </Text>
        <Stack direction="row" sx={{ gap: "1rem" }}>
          <TextInput
            placeholder="nama layanan"
            value={query}
            onChange={(e) => setQuery(() => e.target.value)}
          />
          <Button
            variant="outlined"
            onClick={() => router.push("/laundry/service/create")}
          >
            Tambah
          </Button>
        </Stack>
        <Stack sx={{ gap: "1rem" }}>
          {services
            .filter((el) =>
              el.name?.toLowerCase().includes(query.toLowerCase())
            )
            .map((svc) => {
              return <ServiceCard key={svc.id} {...svc} />;
            })}
        </Stack>
      </Stack>
    </>
  );
}
