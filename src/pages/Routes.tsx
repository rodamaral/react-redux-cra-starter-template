import React, { lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'

const Home = lazy(() => import('./Home'))
const Page1 = lazy(() => import('./Page1'))
const Table = lazy(() => import('./Table'))

export default () => (
    <Suspense fallback={<div>Loading</div>}>
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route path="/page1">
                <Page1 />
            </Route>

            <Route path="/table">
                <Table />
            </Route>
        </Switch>
    </Suspense>
)
