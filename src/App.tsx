import React from 'react'
import './App.css'
import { reset } from './store/auth'
import { connect } from 'react-redux'

function App({ reset }: { reset: any }) {
    return (
        <div>
            TEMPLATE
            <button onClick={(event) => reset()}>Reset</button>
        </div>
    )
}

const mapDispatchToProps = {
    reset,
}

function mapStateToProps(state: any) {
    return { token: state.auth.token }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
