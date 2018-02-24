import React from 'react'

const ActionBar = () => {
    return(
        <ul>
            <li onClick={() => {console.log('clicked seura')}}>Seura</li>
            <li>Jäsenet</li>
            <li>Treenit / Tapahtumat</li>
            <li>Uutiset</li>
            <li>Kilpailut</li>
        </ul>
    )
}

export default ActionBar
