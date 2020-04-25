import React from 'react'
import { Paper } from '@material-ui/core'

function TestDetails(props) {
    console.log(props)
    return (
        <div>
            <Paper elevation={3}>
                <div className="test-container"></div>
            </Paper>
        </div>
    )
}

export default TestDetails
