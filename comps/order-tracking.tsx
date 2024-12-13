"use client";
import { api } from "@/api";
import { OrderTaskProgress } from "@/type/laundry";
import { Step, StepContent, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";

export default function OrderTracking({ order_id }: { order_id: string }) {
  const [steps, setSteps] = useState<OrderTaskProgress[]>([]);

  useEffect(() => {
    async function getData() {
      const resp = await api.order.getProgress(order_id);
      setSteps(() => resp);
    }
    getData();
  }, [order_id]);

  return (
    <Stepper
      orientation="vertical"
      activeStep={steps.filter((el) => el.status == "finished").length}
    >
      {steps.map((item, i) => {
        return (
          <Step key={i}>
            <StepLabel>{item.name}</StepLabel>
            <StepContent>{item.description}</StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}
