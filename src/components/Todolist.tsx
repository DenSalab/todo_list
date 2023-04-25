import React from 'react';
import {taskType} from "../App";

interface ITodolist {
  title: string
  tasks: Array<taskType>
}

const Todolist: React.FC<ITodolist> = ({title, tasks}) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text"/>
        <button>add</button>
        <ul>
          {
            tasks.map((task) => {
              return (
                <li>
                  <input type={'checkbox'} checked={task.isDone}/>
                  <span>{task.title}</span>
                </li>
              )
            })
          }
        </ul>
        <div>
          <button>All</button>
          <button>Active</button>
          <button>Completed</button>
        </div>
      </div>
    </div>
  );
};

export default Todolist;