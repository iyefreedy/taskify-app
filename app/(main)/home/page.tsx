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
import dayjs from "dayjs";
import { useAuth } from "@/lib/hooks/useAuth";
import API from "@/lib/API";
import { Todo } from "@/lib/types";
import { useFetchTodos } from "@/lib/hooks/useFetchTodos";
import Stack from "@mui/material/Stack";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const todoSchema = z.object({
  title: z.string().min(1),
  content: z.string().max(255).optional(),
  dueDate: z.date(),
});

export default function HomePage() {
  const [open, setOpen] = useState(false);
  const { accessToken } = useAuth();
  const { todos } = useFetchTodos();

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      await API.createTodo(data, accessToken!);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Box component="section">
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
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
      </Stack>

      <List>
        {todos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemText>{todo.title}</ListItemText>
            <ListItemText>{todo.content}</ListItemText>
          </ListItem>
        ))}
      </List>

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
            margin="dense"
            fullWidth
            variant="standard"
            {...register("title")}
            error={Boolean(errors.title)}
            helperText={errors.title?.message}
          />
          <TextField
            id="content"
            type="text"
            label="Content"
            margin="dense"
            fullWidth
            variant="standard"
            {...register("content")}
            error={Boolean(errors.content)}
            helperText={errors.content?.message}
          />
          <Controller
            control={control}
            name="dueDate"
            render={({ field: { onChange, value } }) => (
              <DatePicker
                label="Due date"
                value={value ? dayjs(value) : dayjs()}
                onChange={(date) => onChange(date?.toDate())}
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
