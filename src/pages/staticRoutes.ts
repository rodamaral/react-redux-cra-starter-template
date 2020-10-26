import { lazy } from 'react'

const Home = lazy(() => import('./Home'))
const Page1 = lazy(() => import('./Page1'))
const Table = lazy(() => import('./Table'))
const Error404 = lazy(() => import('./Error404'))

const routes = [
    {
        path: '/',
        component: Home,
        exact: true,
    },
    {
        path: '/page1',
        component: Page1,
    },
    {
        path: '/table',
        component: Table,
    },
    {
        path: '*',
        component: Error404,
    },
].map((route) => ({
    ...route,
    exact: !!route.exact,
}))

export default routes
