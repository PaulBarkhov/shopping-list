import React from 'react'
import { Spinner } from 'reactstrap'

export const Loader = () => {
    return (
        <div style={{width: '100%', textAlign: 'center'}}> 
            <Spinner style={{margin: '50px 0 30px', width: '100px', height: '100px'}} color="primary" />
            <h1>Loading...</h1>
        </div>
    )
}