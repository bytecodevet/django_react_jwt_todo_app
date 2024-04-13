import { createContext } from "react";
import { SetStateFunction, Task } from "../types";

interface TasksContextProps {
  tasks: Task[];
  setTasks: SetStateFunction;
}

const TasksContext = createContext<TasksContextProps>({
  tasks: [],
  setTasks: () => {},
});

export default TasksContext;