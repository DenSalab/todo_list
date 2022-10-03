import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType} from "../state/tasks-reducer";
import s from "./Todolist/Todolist.module.css";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan/EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import {useDispatch} from "react-redux";

export const Task = (props: TaskPropsType) => {
    const dispatch = useDispatch();

    const deleteTaskHandler = () => {
        dispatch(removeTaskAC(props.id, props.task.id))
    }
    const onChangeTaskStatus = () => {
        dispatch(changeTaskStatusAC(props.id, props.task.id, !props.task.isDone))
    }
    const onChangeTaskTitle = (title: string) => {
        dispatch(changeTaskTitleAC(props.id, props.task.id, title))
    }
    return <div key={props.task.id} className={props.task.isDone ? s.is_done : ''}>
        <Checkbox
            checked={props.task.isDone}
            onChange={onChangeTaskStatus}
            size={'small'}
        />
        <EditableSpan
            title={props.task.title}
            onChange={onChangeTaskTitle}/>
        <IconButton aria-label="delete" size={'small'} onClick={deleteTaskHandler}>
            <DeleteIcon/>
        </IconButton>
    </div>
}


// types

type TaskPropsType = {
    id: string,
    task: TaskType
}
