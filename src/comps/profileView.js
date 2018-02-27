import React from 'react'

const Profile = ({user, logoutFunc, toggleR2P}) => {
    const greeting =  "Kirjautunut jäsenenä " + user.name
    const gamesPlayedOnline = "Pelattuja pelejä verkossa: " +
        (user.lichess.total_games + user.chessDotCom.total_games)
    const logoutButton = <button onClick={logoutFunc}>Kirjaudu ulos</button>
    let togglePlayButton = <button className="pelivalmis_button" onClick={toggleR2P}>pelivalmis</button>
    if(user.r2play) togglePlayButton = <button onClick={toggleR2P}>opiskelen</button>
    return(
        <div>
            <p><b>{greeting} {logoutButton} </b></p>
            <p className="pelihalukas"><i>{user.r2play ? " Olet valmiina pelaamaan" : ""}</i>{togglePlayButton}</p>
            <p>{gamesPlayedOnline}</p>
            <div className="elo">

                <table className="eloTable" align="center">
                    <tbody>
                    <tr>
                        <td>elo</td><th>chess.com</th><th>lichess.org</th>
                    </tr>
                    <tr>
                        <th>blixt</th><td>{user.chessDotCom.elo}</td><td>{user.lichess.elo}</td>
                    </tr>
                    <tr>
                        <th>rapid</th><td>0</td><td>0</td>
                    </tr>
                    </tbody>
                </table>
            </div>

        </div>
    )
}

export default Profile