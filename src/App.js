import React, {Component} from 'react';
import chessBoardPicture from './images/chessboard_background.png'
import knightPicture from './images/knight.jpg'
import chessIcon from './images/chess_icon.png'
import hyPicture from './images/helsingin_yliopisto_logo.png'
import lichessService from './services/lichess'
import chessDotComService from './services/chessDotCom'
import Login from './comps/Login'
import Signup from './comps/Signup'
import ActionBar from './comps/ActionBar'
import Profile from './comps/profileView'
import './App.css';
import axios from 'axios'

class App extends Component {
    constructor() {
        super()
        this.state = {
            userLoggedIn: false,
            user: {
                name: "",
                password: "",
                lichess: {
                    name:"",
                    elo: "",
                    total_games: 0
                },
                chessDotCom: {
                    name: "",
                    elo: "",
                    total_games: 0
                },
                elo: 1400,
                r2play: false,
                major: ""
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
        console.log("Mount")
    }


    logUserIn = () => async (event) => {
        event.preventDefault()
        const loginable = {
            name: this.state.user.name,
            password: this.state.user.password
        }
        const request = axios.post("http://localhost:2000/api/users/login", loginable)
        const data = await request.then(response => response.data)
        if(data.name){
            console.log(data)
            const user = this.state.user
            user.name = data.name
            user.chessDotCom.name = data.chessDotComName
            user.lichess.name = data.lichessName
            user.major = data.major
            this.setState({user: user})
            this.setState({userLoggedIn: true})
            this.componentWillMount()
        }else{
            console.log("fail")
        }

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

    handleLichessNameChange = () => (event) => {
        const user = this.state.user
        user.lichess.name = event.target.value
        this.setState({user: user})
    }
    handleChessDotComNameChange = () => (event) => {
        const user = this.state.user
        user.chessDotCom.name = event.target.value
        this.setState({user: user})
    }
    handleMajorChange = () => (event) => {
        const user = this.state.user
        user.major = event.target.value
        this.setState({user: user})
    }
    signUp = () => async (event) => {
        event.preventDefault()
        const signable = {
            name: this.state.user.name,
            chessDotComName: this.state.user.chessDotCom.name,
            lichessName: this.state.user.lichess.name,
            major: this.state.user.major,
            password: this.state.user.password
        }
        const request = axios.post("http://localhost:2000/api/users", signable)
        const data = await request.then(response => response.data)
        console.log(data)
    }

    logout = () => (event) => {
        const user = {
            name: "",
                password: "",
                lichess: {
                name:"",
                    elo: "",
                    total_games: 0
            },
            chessDotCom: {
                name: "",
                    elo: "",
                    total_games: 0
            }
        }
        this.setState({user})
        this.setState({userLoggedIn: false})
    }

    toggleR2P = () => () => {
        const user = this.state.user
        const ready = user.r2play
        if(ready){
            user.r2play = false
        }else{
            user.r2play = true
        }
        this.setState({user: user})
    }

    render() {
        let profile = ""


        let login = ""
        let signup = ""
        let or = ""
        let sayLogin = ""

        if(this.state.userLoggedIn){
            profile = <Profile
                            user={this.state.user}
                            logoutFunc={this.logout()}
                            toggleR2P={this.toggleR2P()}/>
        }else{
            sayLogin = "Kirjaudu sisään"
            login = <Login loginFunction={this.logUserIn()}
                           nameFunction={this.handleUsernameChange()}
                           pswFunction={this.handlePasswordChange()}/>
            signup = <Signup className="signupForm"
                             nameFunction={this.handleUsernameChange()}
                             pswFunction={this.handlePasswordChange()}
                             lichessFunction={this.handleLichessNameChange()}
                             chessDotComFunction={this.handleChessDotComNameChange()}
                             majorFunction={this.handleMajorChange()}
                            signupFunction={this.signUp()}/>
            or = "tai LIITY mukaan: "

        }

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">yo-chess</h1>
                    <p className="App-intro">
                        Kumpulan kampuksen shakinpelaajat.
                    </p>
                    <div id="headerPictures">
                        <img className="headerPic" src={chessIcon} alt="Moro"/>
                        <img className="headerPic" src={chessBoardPicture} alt="Moro"/>
                        <img className="headerPic" src={hyPicture} alt="Moro"/>
                        <img className="headerPic" src={chessBoardPicture} alt="Moro"/>
                        <img className="headerPic" src={knightPicture} alt="Moro"/>
                    </div>
                </header>


                {profile}
                <div className="loginDialog">{sayLogin}</div>
                <div>{login}</div>
                <div className="loginDialog">{or}</div>
                <div>{signup}</div>
                <ActionBar/>
            </div>
        );
    }
}

export default App;
