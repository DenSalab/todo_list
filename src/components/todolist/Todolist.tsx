import React from 'react';
import {FilterType, TaskType} from "../../App";
import styles from './Todolist.module.css'
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../editableSpan/EditableSpan";
import {
  Button,
  ButtonGroup,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  IconButton,
  List, ListItem, ListItemIcon, ListItemText
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {TransitionGroup} from 'react-transition-group';


interface ITodolist {
  todoId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoId: string, taskId: string) => void
  filter: FilterType
  changeFilter: (todoId: string, filter: FilterType) => void
  addTask: (todoId: string, title: string) => void
  changeTaskStatus: (todoId: string, taskId: string, isDone: boolean) => void
  removeTodolist: (todoId: string) => void
  changeTaskTitle: (todoId: string, taskId: string, title: string) => void
  changeTodolistTitle: (todoId: string, title: string) => void
}

const Todolist: React.FC<ITodolist> = (
  {
    todoId,
    title,
    tasks,
    removeTask,
    filter,
    changeFilter,
    addTask,
    changeTaskStatus,
    removeTodolist,
    changeTaskTitle,
    changeTodolistTitle
  }
) => {
  const addNewTask = (title: string) => {
    addTask(todoId, title);
  }

  const removeTodolistHandler = () => {
    removeTodolist(todoId);
  }

  const changeTodolistTitleHandler = (title: string) => {
    changeTodolistTitle(todoId, title);
  }

  interface RenderItemOptions {
    item: TaskType;
    removeTaskHandler: (todoId: string, taskId: string) => void;
  }

  const changeTaskStatusHandler = (todoId: string, taskId: string, isDone: boolean) => {
    changeTaskStatus(todoId, taskId, isDone);
  }

  const removeTaskHandler = (todoId: string, taskId: string): void => {
    removeTask(todoId, taskId)
  }

  function renderItem({item, removeTaskHandler}: RenderItemOptions) {
    return (
      <ListItem
        secondaryAction={
          <IconButton
            edge="end"
            aria-label="delete"
            title="Delete"
            onClick={() => removeTaskHandler(todoId, item.id)}
          >
            <DeleteIcon/>
          </IconButton>
        }
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={item.isDone}
            tabIndex={-1}
            disableRipple
            onChange={() => changeTaskStatusHandler(todoId, item.id, !item.isDone)}
            // inputProps={{ 'aria-labelledby': labelId }}
          />
        </ListItemIcon>
        <ListItemText primary={item.title}/>
      </ListItem>
    );
  }

  return (
    <Card variant="elevation" elevation={5} style={{padding: 8}}>
      <CardContent>
        <div className={styles.todolistTitleWrapper}>

          <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>

          <IconButton
            className={styles.deleteTodolistButton}
            onClick={removeTodolistHandler}
            color={"error"}
          >
            <DeleteIcon/>
          </IconButton>
        </div>

        <div className={styles.tasksWrapper}>
          <AddItemForm onPressButton={addNewTask} label={"Add task"}/>

          <List>
            <TransitionGroup>
              {tasks.map((item) => (
                <Collapse key={item.id}>
                  {renderItem({item, removeTaskHandler})}
                </Collapse>
              ))}
            </TransitionGroup>
          </List>
        </div>
      </CardContent>

      <CardActions style={{}}>
        <ButtonGroup
          size={"small"} fullWidth={true} variant="contained" aria-label="outlined primary button group"
          style={{justifyContent: 'space-between'}}
        >
          <Button
            variant={filter === 'all' ? "contained" : "outlined"}
            onClick={() => changeFilter(todoId, 'all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'active' ? "contained" : "outlined"}
            onClick={() => changeFilter(todoId, 'active')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'completed' ? "contained" : "outlined"}
            onClick={() => changeFilter(todoId, 'completed')}
          >
            Completed
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default Todolist;