import {v1} from "uuid";
import {
    addTodolist, changeTodolistFilter,
    changeTodolistTitle,
    removeTodolist,
    TodolistActionType,
    todolistsReducer
} from "./todolists-reducer";
import {FilterValuesType, TodolistType} from "../app/App";

test('correct todolist should be removed', () => {
    const todolist_1 = v1();
    const todolist_2 = v1();

    const startState: Array<TodolistType> = [
        {id: todolist_1, title: "What to learn?", filter: 'all'},
        {id: todolist_2, title: "What to buy?", filter: 'all'}
    ]

    const endState = todolistsReducer(startState, removeTodolist(todolist_1));

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolist_2);
})

test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, addTodolist(newTodolistTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe(newTodolistTitle)
})

test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newTodolistTitle = 'New Todolist'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistTitle(todolistId2, newTodolistTitle))

    expect(endState[0].title).toBe('What to learn')
    expect(endState[1].title).toBe(newTodolistTitle)
})

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    let newFilter: FilterValuesType = 'completed'

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startState, changeTodolistFilter(todolistId2, newFilter))

    expect(endState[0].filter).toBe('all')
    expect(endState[1].filter).toBe(newFilter)
})
