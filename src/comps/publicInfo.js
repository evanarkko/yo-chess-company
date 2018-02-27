import React from 'react'

const Info = ({totalUsers, readyUsers}) => {
    return(
        <ul>
            <li>{totalUsers} opiskelijaa liittynyt</li>
            <li>{readyUsers} opiskelijaa valmiina pelaamaan</li>
        </ul>
    )
}

export default Info