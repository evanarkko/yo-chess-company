import React from 'react'

const Login = ({loginFunction, nameFunction, pswFunction}) => {
    return(
            <form onSubmit={loginFunction}>
                <table align="center">
                    <tbody>
                    <tr>
                        <td><input type="text" placeholder="username" onChange={nameFunction}/></td>
                    </tr>
                    <tr>
                        <td><input type="password" placeholder="password" onChange={pswFunction}/></td>
                    </tr>
                    <tr>
                        <td><button type="submit">Kirjaudu</button></td>
                    </tr>
                    </tbody>
                </table>
            </form>
    )
}

export default Login