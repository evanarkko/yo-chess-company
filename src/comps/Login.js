import React from 'react'

const Login = ({loginFunction, nameFunction, pswFunction}) => {
    return(
            <form onSubmit={loginFunction}>
                <input type="text" placeholder="username" onChange={nameFunction}/>
                <input type="password" placeholder="password" onChange={pswFunction}/>
                <button type="submit">Kirjaudu</button>
            </form>
    )
}

export default Login