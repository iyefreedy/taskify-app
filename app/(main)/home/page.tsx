"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { z } from "zod";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "@/lib/types";

const todoSchema = z.object({
  title: z.string().min(1),
  description: z.string().max(255).optional(),
  dueDate: z.date(),
});

export default function HomePage() {
  const [open, setOpen] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Todo>({
    resolver: zodResolver(todoSchema),
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <Box
      component="section"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        My Tasks
      </Typography>
      <Button
        variant="outlined"
        startIcon={<AddTaskIcon />}
        onClick={handleOpen}
      >
        Add new Todo
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          sx: { width: "100%" },
          onSubmit,
        }}
      >
        <DialogTitle>Create new todo</DialogTitle>
        <DialogContent
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            rowGap: 2,
          }}
        >
          <TextField
            id="title"
            type="text"
            label="Title"
            autoFocus
            margin="dense"
            fullWidth
            variant="standard"
            {...register("title")}
          />
          <TextField
            id="description"
            type="text"
            label="Description"
            margin="dense"
            fullWidth
            variant="standard"
            {...register("description")}
          />
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <DatePicker
                label="Due date"
                onAccept={(date) => {
                  field.onChange(date);
                }}
                value={field.value}
                {...register("dueDate")}
              />
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
