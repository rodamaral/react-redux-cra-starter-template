import React from 'react'
import { reset } from 'store/auth'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from 'components/Button'

function Home({ reset }: { reset: Function }) {
    const history = useHistory()

    const onClick = () => {
        reset()
        history.push('/Page1')
    }

    return (
        <div>
            Home
            <Button onClick={onClick}>Go to Page1</Button>
        </div>
    )
}

const mapDispatchToProps = {
    reset,
}

function mapStateToProps(state: any) {
    return { token: state.auth.token }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
