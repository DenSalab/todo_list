import React from 'react';
import {Todolist} from "../components/Todolist/Todolist";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC, removeTodolistAC, TodolistType,
} from "../state/todolists-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";

function AppWidthRedux(){
    const dispatch = useDispatch();
    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists);

    const changeFilter = (id: string, filter: FilterValuesType) => {
        dispatch(changeTodolistFilterAC(id, filter))
    }
    const changeTodolistTitle = (id: string, title: string) => {
        dispatch(changeTodolistTitleAC(id, title))
    }
    const removeTodolist = (id: string) => {
        dispatch(removeTodolistAC(id))
    }
    const addTodolist = (title: string) => {
        dispatch(addTodolistAC(title))
    }

    return (
        <div>
            <AppBar position={'static'}>
                <Toolbar>
                    <IconButton edge={'start'} color={'inherit'} area-label={'menu'}>
                        <Menu/>
                    </IconButton>
                    <Typography variant={'h6'}>
                        News
                    </Typography>
                    <Button color={'inherit'}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{margin: '15px 0'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(todo => {
                            return (
                                <Grid item key={todo.id}>
                                    <Paper>
                                        <Todolist
                                            id={todo.id}
                                            title={todo.title}
                                            changeFilter={changeFilter}
                                            filter={todo.filter}
                                            removeTodolist={removeTodolist}
                                            changeTodolistTitle={changeTodolistTitle}
                                        />
                                    </Paper>
                                </Grid>
                            )
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
}

export default AppWidthRedux;


// types

export type FilterValuesType = 'all' | 'completed' | 'active'