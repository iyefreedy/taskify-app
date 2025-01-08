"use client";

import Typography from "@mui/material/Typography";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Todo } from "@/lib/types";
import { useFetchTodos } from "@/lib/hooks/useFetchTodos";
import Stack from "@mui/material/Stack";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { formatDate } from "@/lib/utils/date-format";

import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import TodoForm from "@/lib/ui/TodoForm";

const todoSchema = z.object({
  title: z.string().min(1),
  content: z.string().max(255).optional(),
  dueDate: z.instanceof(Date).optional(),
  done: z.boolean().optional(),
});

export default function HomePage() {
  const { todos, addTodo, updateTodo } = useFetchTodos();

  const methods = useForm<Todo>({
    resolver: zodResolver(todoSchema),
  });

  const onSubmit = methods.handleSubmit(async (data) => {
    await addTodo(data);
    methods.reset();
  });

  return (
    <Stack component="section" sx={{ rowGap: 2 }}>
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        My Tasks
      </Typography>

      <FormProvider {...methods}>
        <TodoForm onSubmit={onSubmit} />
      </FormProvider>

      <Card>
        {todos.length > 0 && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell width={70} />
                <TableCell width={300}>Title</TableCell>
                <TableCell>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todos.map((todo) => (
                <TableRow key={todo.id}>
                  <TableCell width={70}>
                    <Checkbox
                      onChange={async () => {
                        await updateTodo({ ...todo, done: !todo.done });
                      }}
                      checked={todo.done}
                    />
                  </TableCell>
                  <TableCell width={300}>{todo.title}</TableCell>
                  <TableCell>
                    {todo.dueDate ? formatDate(todo.dueDate) : "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>
    </Stack>
  );
}
