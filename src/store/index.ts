import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { createLogger } from 'redux-logger'
import { combineReducers } from 'redux'
import auth from './auth'

const rootReducer = combineReducers({
    auth,
})

const loggerMiddleware = createLogger()

export default function configureAppStore(preloadedState: any) {
    const store = configureStore({
        reducer: rootReducer,
        // redux-logger must be the last middleware so as to not log functions/promises
        middleware: [...getDefaultMiddleware(), loggerMiddleware],
        preloadedState,
    })

    // TODO: hot module replacement
    if (process.env.NODE_ENV === 'development' && module.hot) {
        module.hot?.accept('./', () => {
            module.hot?.accept('./', () => store.replaceReducer(rootReducer))
        })
    }

    return store
}
