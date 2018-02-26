import React from 'react'

const Signup = ({
                    signupFunction, nameFunction,
                    pswFunction, lichessFunction, chessDotComFunction, majorFunction
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
                        <input type="text" placeholder="Pääaine" onChange={majorFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" placeholder="lichess.org käyttäjä" onChange={lichessFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="text" placeholder="chess.com käyttäjä" onChange={chessDotComFunction}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="password" placeholder="salasana" onChange={pswFunction}/>
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