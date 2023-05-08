import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AxiosError } from "axios";

type ITodos = string;

const fetchCountries = (): Promise<ITodos[]> =>
  axios.get("http://localhost:3000/countriesNames").then((res) => res.data);

function TodoList() {
  const queryClient = useQueryClient();

  const {
    data: todos = [],
    isLoading,
    error,
  } = useQuery<ITodos[], AxiosError>({
    queryKey: ["todos"],
    queryFn: fetchCountries,
    enabled: false,
  });

  const addTodoToMutation = useMutation<string[], unknown, string>({
    onMutate: (newTodo: string) => {
      const previousTodos = queryClient.getQueryData<ITodos>(["todos"]);
      if (previousTodos) {
        queryClient.setQueryData(["todos"], [...previousTodos, newTodo]);
        return [...previousTodos, newTodo];
      }
      return [newTodo];
    },
  });

  const handleAddTodo = () => {
    addTodoToMutation.mutate("todo3");
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>error</p>;
  }

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo}>{todo}</li>
        ))}
      </ul>
      <button type="button" onClick={handleAddTodo}>
        Add Todo
      </button>
    </div>
  );
}

export default TodoList;
