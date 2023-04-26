import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, TaskType} from "../../App";
import styles from './Todolist.module.css'

interface ITodolist {
  todoId: string
  title: string
  tasks: Array<TaskType>
  removeTask: (todoId: string, taskId: string) => void
  changeFilter: (filter: FilterType) => void
  filter: FilterType
  addTask: (todoId: string, title: string) => void
}

const Todolist: React.FC<ITodolist> = (
  {
    todoId,
    title,
    tasks,
    removeTask,
    changeFilter,
    filter,
    addTask
  }
) => {
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  }

  const addTaskHandler = () => {
    if (newTaskTitle.trim()) {
      addTask(todoId, newTaskTitle.trim());
    }
    setNewTaskTitle('');
  }

  const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTaskHandler();
    }
  }
  return (
    <div className={styles.todolistCard}>
      <h3 className={styles.todolistTitle}>{title}</h3>
      <div className={styles.tasksWrapper}>
        <input
          className={styles.newTaskInput}
          value={newTaskTitle}
          onChange={onChangeNewTaskTitle}
          onKeyDown={onKeyDownHandler}
        />
        <button className={styles.addTaskButton} onClick={addTaskHandler}>add</button>
        <ul className={styles.tasksList}>
          {
            tasks.map((task) => {
              const removeTaskHandler = () => {
                removeTask(todoId, task.id)
              }
              return (
                <li key={task.id} className={styles.tasksListItem}>
                  <div>
                    <input
                      className={styles.taskCheckbox}
                      type={'checkbox'}
                      checked={task.isDone}
                      onChange={() => {
                      }}
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
            onClick={() => changeFilter('all')}
          >
            All
          </button>
          <button
            className={filter === 'active' ? styles.activeFilterButton : undefined}
            onClick={() => changeFilter('active')}
          >
            Active
          </button>
          <button
            className={filter === 'completed' ? styles.activeFilterButton : undefined}
            onClick={() => changeFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;