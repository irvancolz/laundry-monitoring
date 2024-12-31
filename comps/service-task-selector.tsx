"use client";
import { api } from "@/api";
import { OrderTask } from "@/type/laundry";
import { Checkbox, FormControlLabel, FormGroup, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export default function ServiceTaskSelector({
  value,
  onChange,
}: {
  value: OrderTask[];
  onChange: (task: OrderTask[]) => void;
}) {
  const [selectedTasks, setSelectedTasks] = useState<OrderTask[]>(value);
  const [tasks, setTasks] = useState<OrderTask[]>(value);

  function handleTaskSelect(task: OrderTask) {
    if (selectedTasks.find((el) => el.id == task.id) != null) {
      setSelectedTasks((prev) => prev.filter((el) => el.id != task.id));
    } else {
      setSelectedTasks((prev) => [...prev, task]);
    }
  }

  useEffect(() => {
    setSelectedTasks(() => value);
  }, [value]);

  useEffect(() => {
    onChange(selectedTasks);
  }, [selectedTasks]);

  useEffect(() => {
    async function getTasks() {
      const resp = await api.orderTask.getAll();
      setTasks(() => resp);
    }
    getTasks();
  }, []);

  return (
    <Stack>
      <FormGroup>
        {tasks.map((task) => {
          return (
            <FormControlLabel
              key={task.id}
              control={<Checkbox />}
              checked={selectedTasks.find((el) => el.id == task.id) != null}
              onChange={(e) => handleTaskSelect(task)}
              label={task.name}
            />
          );
        })}
      </FormGroup>
    </Stack>
  );
}
