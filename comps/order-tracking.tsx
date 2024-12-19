"use client";
import { api } from "@/api";
import { OrderTaskProgress } from "@/type/laundry";
import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

export default function OrderTracking({ order_id }: { order_id: string }) {
  const [steps, setSteps] = useState<OrderTaskProgress[]>([]);

  useEffect(() => {
    async function getData() {
      const resp = await api.orderProgress.get(order_id);
      setSteps(() => resp);
    }
    getData();
  }, [order_id]);

  return (
    <Stepper
      orientation="vertical"
      activeStep={steps.filter((el) => el.finished).length}
    >
      {steps.map((item, i) => {
        return (
          <Step key={i}>
            <StepLabel>{`${item.name} ${
              item.finished
                ? ": " + dayjs(item.updated_at).format("DD MMM YYYY HH:mm")
                : ""
            }`}</StepLabel>
            <StepContent
              sx={{
                fontSize: ".8rem",
              }}
            >
              {item.description}
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}
