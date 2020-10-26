import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import routes from './staticRoutes'

const Routes = () => (
    <Suspense fallback={<div>Loading</div>}>
        <Switch>
            {routes.map(({ component: Component, ...rest }) => (
                <Route {...rest}>
                    <Component />
                </Route>
            ))}
        </Switch>
    </Suspense>
)

export default Routes
