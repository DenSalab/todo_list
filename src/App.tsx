import React, {useState} from 'react';
import './App.css';
import Todolist from "./components/todolist/Todolist";
import {v1} from 'uuid';
import AddItemForm from "./components/addItemForm/AddItemForm";
import {AppBar, Box, Button, Container, Grid, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';

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
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{mr: 2}}
            >
              <MenuIcon/>
            </IconButton>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              Awesome To-Do!
            </Typography>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </Container>

      </AppBar>

      <Container fixed>
        <Box marginTop={4}>
          <Grid container paddingY={5}>
            <AddItemForm onPressButton={addTodoList} label={"Add list"}/>
          </Grid>

          <Grid container alignItems={'start'} spacing={4}>
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
                  <Grid item>
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
                  </Grid>
                )
              })
            }
          </Grid>
        </Box>

      </Container>
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