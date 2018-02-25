import React from 'react'

const Signup = ({
                    signupFunction, nameFunction,
                    pswFunction, lichessFunction, chessDotComFunction
                }) => {
    return (
        <form onSubmit={signupFunction}>
            <table align="center">
                <tbody>
                <tr>
                    <td>
                        <input type="text" placeholder="nimi" onChange={nameFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" placeholder="käyttäjänimi" onChange={nameFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="email" placeholder="email" onChange={nameFunction}/>
                    </td>
                </tr>

                <tr>
                    <td>
                        <input type="text" placeholder="lichess.org käyttäjä"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" placeholder="chess.com käyttäjä"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" placeholder="Pääaine"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="password" placeholder="salasana" onChange={pswFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="password" placeholder="salasana uudestaan"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <button type="submit">Luo käyttäjä</button>
                    </td>
                </tr>
                </tbody>
            </table>
        </form>
    )
}

export default Signup