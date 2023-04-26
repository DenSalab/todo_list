import React from 'react';
import {FilterType, TaskType} from "../../App";
import styles from './Todolist.module.css'
import AddItemForm from "../addItemForm/AddItemForm";
import EditableSpan from "../editableSpan/EditableSpan";

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

  return (
    <div className={styles.todolistCard}>
      <div className={styles.todolistTitleWrapper}>
        <h3 className={styles.todolistTitle}>
          <EditableSpan title={title} changeTitle={changeTodolistTitleHandler}/>
        </h3>
        <button
          className={styles.deleteTodolistButton}
          onClick={removeTodolistHandler}
        >
          x
        </button>
      </div>

      <div className={styles.tasksWrapper}>
        <AddItemForm onPressButton={addNewTask}/>

        <ul className={styles.tasksList}>
          {
            tasks.map((task) => {
              const removeTaskHandler = () => {
                removeTask(todoId, task.id)
              }
              const changeTaskStatusHandler = () => {
                changeTaskStatus(todoId, task.id, !task.isDone);
              }
              const changeTaskTitleHandler = (title: string) => {
                changeTaskTitle(todoId, task.id, title);
              }

              return (
                <li key={task.id} className={`${styles.tasksListItem} ${task.isDone && styles.isDone}`}>
                  <div>
                    <input
                      className={styles.taskCheckbox}
                      type={'checkbox'}
                      checked={task.isDone}
                      onChange={changeTaskStatusHandler}
                    />
                    <EditableSpan title={task.title} changeTitle={changeTaskTitleHandler}/>
                  </div>
                  <button
                    className={styles.deleteTaskButton}
                    onClick={removeTaskHandler}
                  >
                    x
                  </button>
                </li>
              )
            })
          }
        </ul>
        <div>
          <button
            className={filter === 'all' ? styles.activeFilterButton : undefined}
            onClick={() => changeFilter(todoId, 'all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? styles.activeFilterButton : undefined}
            onClick={() => changeFilter(todoId, 'active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? styles.activeFilterButton : undefined}
            onClick={() => changeFilter(todoId, 'completed')}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;