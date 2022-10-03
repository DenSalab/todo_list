import s from './Todolist.module.css'
import {FilterValueType, TaskType} from "../app/App";
import React from "react";
import {AddItemForm} from "./AddItemForm/AddItemForm";

export const Todolist = (props: TodolistType) => {
    const removeTodolistHandler = () => {
        props.removeTodolist(props.id)
    }
    const addTask = (title: string) => {
        props.addTask(props.id, title)
    }
    return (
        <div className={s.wrapper}>
            <h3>{props.title}
                <button onClick={removeTodolistHandler}>x</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                {
                    props.tasks.map((e) => {
                        const deleteTaskHandler = () => {
                            props.removeTask(props.id, e.id)
                        }
                        const onChangeTaskStatus = () => {
                            props.changeTaskStatus(props.id, e.id, !e.isDone)
                        }
                        return <li key={e.id}>
                            <input
                                className={e.isDone ? s.is_done : ''}
                                type="checkbox"
                                checked={e.isDone}
                                onChange={onChangeTaskStatus}/>
                            <span className={e.isDone ? s.is_done : ''}>{e.title}</span>
                            <button onClick={deleteTaskHandler}>x</button>
                        </li>
                    })
                }
            </ul>
            <div>
                <button
                    className={props.filter === 'all' ? s.active_filter : ''}
                    onClick={() => props.changeFilter(props.id, 'all')}>all
                </button>
                <button
                    className={props.filter === 'active' ? s.active_filter : ''}
                    onClick={() => props.changeFilter(props.id, 'active')}>active
                </button>
                <button
                    className={props.filter === 'completed' ? s.active_filter : ''}
                    onClick={() => props.changeFilter(props.id, 'completed')}>completed
                </button>
            </div>
        </div>
    )
}

// types

type TodolistType = {
    id: string
    title: string,
    tasks: Array<TaskType>,
    removeTask: (id: string, taskId: string) => void
    changeFilter: (id: string, filter: FilterValueType) => void
    addTask: (id: string, title: string) => void
    changeTaskStatus: (id: string, taskId: string, isDone: boolean) => void
    filter: FilterValueType
    removeTodolist: (id: string) => void
}
