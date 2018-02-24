import React, {Component} from 'react';
import chessBoardPicture from './images/chessboard_background.png'
import knightPicture from './images/knight.jpg'
import chessIcon from './images/chess_icon.png'
import lichessService from './services/lichess'
import chessDotComService from './services/chessDotCom'
import Login from './comps/Login'
import Signup from './comps/Signup'
import ActionBar from './comps/ActionBar'

import './App.css';

class App extends Component {
    constructor() {
        super()
        this.state = {
            userLoggedIn: false,
            user: {
                name: "Evan",
                password: "",
                lichess: {
                    name:"eamiller",
                    elo: "",
                    total_games: 0
                },
                chessDotCom: {
                    name: "Evanschess1",
                    elo: "1250",
                    total_games: 0
                },
                elo: 1400
            }
        }
    }

    componentWillMount() {
        lichessService.getUserBlitzElo(this.state.user.lichess.name).then(elo => {
            const user = this.state.user
            user.lichess.elo = elo
            this.setState({user : user})
        })
        chessDotComService.getUserBlitzElo(this.state.user.chessDotCom.name).then(elo => {
            const user = this.state.user
            console.log(elo)
            user.chessDotCom.elo = elo
            this.setState({user : user})
        })
        lichessService.getTotalGamesPlayed(this.state.user.lichess.name).then(count => {
            const user = this.state.user
            user.lichess.total_games = count
            this.setState({user : user})
        })
        chessDotComService.getTotalGamesPlayed(this.state.user.chessDotCom.name).then(count => {
            console.log(count)
            const user = this.state.user
            user.chessDotCom.total_games = count
            this.setState({user : user})
        })
    }

    logUserIn = () => (event) => {
        event.preventDefault()
        console.log('User getz logged in')
        this.setState({userLoggedIn: true})
    }

    handleUsernameChange = () => (event) => {
        const user = this.state.user
        user.name = event.target.value
        this.setState({user: user})
    }

    handlePasswordChange = () => (event) => {
        const user = this.state.user
        user.password = event.target.value
        this.setState({user: user})
    }

    logout = () => (event) => {
        this.setState({userLoggedIn: false})
    }

    render() {
        let greeting = ""
        let currentElos = ""
        let gamesPlayed = ""
        let logoutButton = ""

        let login = ""
        let signup = ""
        let or = ""

        if(this.state.userLoggedIn){
            greeting =  "Kirjautunut nimellä " + this.state.user.name
            currentElos = "Tämänhetkinen Blixt elosi: Chess.com " + this.state.user.chessDotCom.elo +
                ", Lichess " + this.state.user.lichess.elo
            gamesPlayed = "Pelattuja pelejä verkossa yhteensä: " +
                (this.state.user.lichess.total_games + this.state.user.chessDotCom.total_games)
            logoutButton = <button onClick={this.logout()}>logout</button>
        }else{
            login = <Login loginFunction={this.logUserIn()}
                           nameFunction={this.handleUsernameChange()}
                           pswFunction={this.handlePasswordChange()}/>
            signup = <Signup className="signupForm" />
            or = "TAI liity mukaan: "
        }

        /*<Login loginFunction={this.logUserIn()}
        nameFunction={this.handleUsernameChange()}
        pswFunction={this.handlePasswordChange()}/>;*/

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">yo-chess-company</h1>
                    <p className="App-intro">
                        Helsingin yliopiston Kumpulan chess-pelurit.
                    </p>
                    <div id="headerPictures">
                        <img className="headerPic" src={chessIcon} alt="Moro"/>
                        <img className="headerPic" src={chessBoardPicture} alt="Moro"/>
                        <img className="headerPic" src={knightPicture} alt="Moro"/>
                    </div>
                </header>

                <p><b>{greeting} {logoutButton}</b></p>
                <p>{currentElos}</p>
                <p>{gamesPlayed}</p>
                <div>{login}</div>
                <div id="or">{or}</div>
                <div className="signupForm">{signup}</div>
                <ActionBar/>

            </div>
        );
    }
}

export default App;
