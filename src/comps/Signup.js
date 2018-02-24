import React from 'react'

const Signup = ({
                    signupFunction, nameFunction,
                    pswFunction, lichessFunction, chessDotComFunction
                }) => {
    return (
        <form onSubmit={signupFunction}>
            <table>
                <tbody>
                <tr>
                    <td>
                        <input type="text" placeholder="username" onChange={nameFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="email" placeholder="email" onChange={nameFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="password" placeholder="password" onChange={pswFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="password" placeholder="password again"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" placeholder="lichess (optional)"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" placeholder="chess.com (optional)"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" placeholder="Major (cs/math/chem...)"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="submit">Sign up</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}

export default Signup