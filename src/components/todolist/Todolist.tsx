import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from "../../App";
import styles from './Todolist.module.css'

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
    removeTodolist
  }
) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState('');

  const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    setError('');
  }

  const addTaskHandler = () => {
    if (newTaskTitle.trim()) {
      setError('')
      addTask(todoId, newTaskTitle.trim());
    } else {
      setError('Field is required!');
    }
    setNewTaskTitle('');
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  }

  const removeTodolistHandler = () => {
    removeTodolist(todoId);
  }
  return (
    <div className={styles.todolistCard}>
      <div className={styles.todolistTitleWrapper}>
        <h3 className={styles.todolistTitle}>{title}</h3>
        <button
          className={styles.deleteTodolistButton}
          onClick={removeTodolistHandler}
        >
          x
        </button>
      </div>

      <div className={styles.tasksWrapper}>
        <div className={styles.inputBox}>
          <input
            className={`${styles.newTaskInput} ${error && styles.error}`}
            value={newTaskTitle}
            onChange={onChangeNewTaskTitle}
            onKeyDown={onKeyDownHandler}
          />
          <button className={styles.addTaskButton} onClick={addTaskHandler}>add</button>
        </div>
        {
          error && (
            <span className={styles.errorMessage}>Field is required!</span>
          )
        }
        <ul className={styles.tasksList}>
          {
            tasks.map((task) => {
              const removeTaskHandler = () => {
                removeTask(todoId, task.id)
              }
              const changeTaskStatusHandler = () => {
                changeTaskStatus(todoId, task.id, !task.isDone);
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
                    <span className={styles.taskTitle}>{task.title}</span>
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