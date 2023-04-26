import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/todolist/Todolist";
import {v1} from 'uuid';

function App() {

  const [tasks, setTasks] = useState<Array<TaskType>>([
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JavaScript', isDone: false},
  ]);

  const [filter, setFilter] = useState<FilterType>('all');

  let filteredTasks = tasks;

  if (filter === 'active') {
    filteredTasks = tasks.filter(task => !task.isDone);
  }

  if (filter === 'completed') {
    filteredTasks = tasks.filter(task => task.isDone);
  }

  const removeTask = (todoId: string, taskId: string) => {
    setTasks([
      ...tasks.filter(task => task.id !== taskId)
    ])
  }

  const addTask = (todoId: string, title: string) => {
    const newTask: TaskType = {id: v1(), title, isDone: false};
    setTasks([newTask, ...tasks]);
  }

  return (
    <div className="App">
      <Todolist
        todoId={v1()}
        title={'What to learn'}
        tasks={filteredTasks}
        removeTask={removeTask}
        changeFilter={setFilter}
        filter={filter}
        addTask={addTask}
      />
    </div>
  );
}

export default App;

// types
export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'