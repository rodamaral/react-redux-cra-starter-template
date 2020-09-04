import React from 'react'
import { useMount, useTitle } from 'react-use'
import './App.css'
import Routes from './pages/Routes'

export default function App() {
    useTitle('react-redux-cra-starter-template')

    useMount(() => {
        console.log('Mounted')
    })

    return (
        <div>
            <header>Header</header>

            <main>
                <Routes />
            </main>
        </div>
    )
}
