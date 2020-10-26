import Button from 'components/Button'
import React from 'react'
import { useHistory } from 'react-router-dom'

function Error404() {
    const history = useHistory()

    const onClick = () => {
        history.push('/')
    }

    return (
        <section>
            <h1>Error 404</h1>

            <Button onClick={onClick}>Go Home</Button>
        </section>
    )
}

export default Error404
