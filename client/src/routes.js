import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import { AuthPage } from './pages/AuthPage'
import { HomePage } from './pages/HomePage'
import { CreatePage } from './pages/CreatePage'

export const useRoutes = (isAuthenticated, sendList, lists, deleteList) => {
    if (isAuthenticated) {
        return (
            <Switch>
                <Route path="/create" exact>
                    <CreatePage sendList={sendList}/>
                </Route>
                <Route path="/home" exact>
                    <HomePage lists={lists} deleteList={deleteList}/>
                </Route>
                <Redirect to="/home" />
            </Switch>
        )
    }

    return (
        <Switch>
            <Switch>
                <Route path="/" exact>
                    <AuthPage/>
                </Route>
                <Redirect to="/"/>
            </Switch>
        </Switch>
    )
}