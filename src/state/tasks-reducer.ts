import {FilterValuesType, TodolistType} from "../app/App";
import {v1} from "uuid";

export const todolistsReducer = (state: Array<TodolistType>, action: TodolistActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(todo => todo.id !== action.id);
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: v1(), title: action.title, filter: 'all'}];
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(todo => todo.id === action.id)
            if(todolist){
                todolist.title = action.title;
            }
            return [...state];
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(todo => todo.id === action.id)
            if(todolist){
                todolist.filter = action.filter;
            }
            return [...state];
        }
        default: {
            return state
        }
    }

}

// action creators
export const removeTodolist = (id: string) => ({
    type: 'REMOVE-TODOLIST', id,
}) as const;
export const addTodolist = (title: string) => ({
    type: 'ADD-TODOLIST', title
}) as const;
export const changeTodolistTitle = (id: string, title: string) => ({
    type: 'CHANGE-TODOLIST-TITLE', id, title
}) as const;
export const changeTodolistFilter = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER', id, filter
}) as const;

// types
export type TodolistActionType =
    ReturnType<typeof removeTodolist> |
    ReturnType<typeof addTodolist> |
    ReturnType<typeof changeTodolistTitle> |
    ReturnType<typeof changeTodolistFilter>