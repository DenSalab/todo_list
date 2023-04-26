import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/todolist/Todolist";
import {v1} from 'uuid';
import AddItemForm from "./components/addItemForm/AddItemForm";

function App() {

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'What to learn', filter: 'active'},
    {id: todolistId2, title: 'What to buy', filter: 'completed'},
  ]);

  const [tasks, setTasks] = useState<TasksType>({
    [todolistId1]: [
      {id: v1(), title: 'HTML', isDone: true},
      {id: v1(), title: 'CSS', isDone: true},
      {id: v1(), title: 'JavaScript', isDone: false},
    ],
    [todolistId2]: [
      {id: v1(), title: 'book', isDone: false},
      {id: v1(), title: 'milk', isDone: false},
      {id: v1(), title: 'bicycle', isDone: true},
    ],
  });

  const removeTask = (todoId: string, taskId: string) => {
    setTasks({...tasks, [todoId]: tasks[todoId].filter(task => task.id !== taskId)});
  }

  const addTask = (todoId: string, title: string) => {
    const newTask = {id: v1(), title, isDone: false};
    setTasks({...tasks, [todoId]: [newTask, ...tasks[todoId]]});
  }

  const changeTaskStatus = (todoId: string, taskId: string, isDone: boolean) => {
    setTasks({
      ...tasks, [todoId]: tasks[todoId].map(task => task.id === taskId ? {...task, isDone} : task)
    });
  }
  const changeTaskTitle = (todoId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks, [todoId]: tasks[todoId].map(task => task.id === taskId ? {...task, title} : task)
    });
  }

  const changeFilter = (todoId: string, filter: FilterType) => {
    setTodoLists([
      ...todoLists.map(todoList => todoList.id === todoId ? {...todoList, filter} : todoList)
    ])
  }

  const removeTodolist = (todoId: string) => {
    setTodoLists([
      ...todoLists.filter(todolist => todolist.id !== todoId)
    ])

    delete tasks[todoId]
    setTasks({
      ...tasks
    })
  }

  const addTodoList = (title: string) => {
    const todolistId = v1();
    const newTodolist: TodolistType = {id: todolistId, title, filter: 'all'};
    setTodoLists([newTodolist, ...todoLists]);
    setTasks({
      ...tasks,
      [todolistId]: []
    })
  }

  const changeTodolistTitle = (todoId: string, title: string) => {
    setTodoLists([
      ...todoLists.map(todoList => todoList.id === todoId ? {...todoList, title} : todoList)
    ])
  }

  return (
    <div className="App">
      <AddItemForm onPressButton={addTodoList}/>

      {
        todoLists.map(todolist => {
          let filteredTasks = tasks[todolist.id];
          if (todolist.filter === 'active') {
            filteredTasks = tasks[todolist.id].filter(task => !task.isDone);
          }
          if (todolist.filter === 'completed') {
            filteredTasks = tasks[todolist.id].filter(task => task.isDone);
          }

          return (
            <Todolist
              key={todolist.id}
              todoId={todolist.id}
              title={todolist.title}
              tasks={filteredTasks}
              removeTask={removeTask}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              filter={todolist.filter}
              changeFilter={changeFilter}
              removeTodolist={removeTodolist}
              changeTaskTitle={changeTaskTitle}
              changeTodolistTitle={changeTodolistTitle}
            />
          )
        })
      }
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

export type TasksType = {
  [key: string]: Array<TaskType>
}

export type TodolistType = {
  id: string,
  title: string,
  filter: FilterType
}

export type FilterType = 'all' | 'active' | 'completed'