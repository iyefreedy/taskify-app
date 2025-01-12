"use client";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import InputBase from "@mui/material/InputBase";

import Stack from "@mui/material/Stack";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Box from "@mui/material/Box";
import { Controller, useFormContext } from "react-hook-form";
import { Todo } from "../types";
import dayjs from "dayjs";

interface TodoFormProps {
  onSubmit: () => Promise<void>;
}

export default function TodoForm({ onSubmit }: TodoFormProps) {
  const { register, control, watch } = useFormContext<Todo>();

  const formValues = watch();

  return (
    <Card>
      <Box component="form" onSubmit={onSubmit}>
        <Stack direction="row" sx={{ paddingX: 4, paddingY: 1, columnGap: 2 }}>
          <Checkbox {...register("done")} />
          <InputBase
            {...register("title")}
            size="small"
            fullWidth
            placeholder="Add new task"
          />
        </Stack>
        <Divider />
        <Stack
          direction="row"
          sx={{
            paddingX: 4,
            paddingY: 1,
            columnGap: 2,
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "background.default",
          }}
        >
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => {
              return (
                <DatePicker
                  disablePast
                  value={field.value ? dayjs(field.value) : null}
                  inputRef={field.ref}
                  onChange={(date) => {
                    field.onChange(date?.toDate());
                  }}
                  slotProps={{
                    actionBar: {
                      actions: ["clear"],
                    },
                    textField: {
                      size: "small",
                      placeholder: "Due date",
                    },
                  }}
                />
              );
            }}
          ></Controller>

          <Button
            type="submit"
            variant="contained"
            size="small"
            disabled={!Boolean(formValues.title)}
          >
            Add
          </Button>
        </Stack>
      </Box>
    </Card>
  );
}
