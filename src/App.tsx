import React from 'react';
import './App.css';
import Todolist from "./components/Todolist";
import {v1} from 'uuid';

function App() {
  const tasks: Array<taskType> = [
    {id: v1(), title: 'HTML', isDone: true},
    {id: v1(), title: 'CSS', isDone: true},
    {id: v1(), title: 'JavaScript', isDone: false},
  ]
  return (
    <div className="App">
      <Todolist title={'What to learn'} tasks={tasks}/>
    </div>
  );
}

export default App;


export type taskType = {
  id: string,
  title: string,
  isDone: boolean
}