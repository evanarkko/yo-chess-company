import React, {Component} from 'react';
import chessBoardPicture from './images/chessboard_background.png'
import knightPicture from './images/knight.jpg'
import chessIcon from './images/chess_icon.png'
import hyPicture from './images/helsingin_yliopisto_logo.png'
import lichessService from './services/lichess'
import chessDotComService from './services/chessDotCom'
import messageService from './services/messages_service'
import Login from './comps/Login'
import Signup from './comps/Signup'
import Info from './comps/publicInfo'
import Profile from './comps/profileView'
import Chat from './comps/Chat'
import './App.css';
import axios from 'axios'

class App extends Component {
    constructor() {
        super()
        this.state = {
            info: [],
            userLoggedIn: false,
            user: {
                name: "",
                password: "",
                lichess: {
                    name: "",
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
            },
            messages: {}
        }
        console.log(this.state)
    }

    componentWillMount() {
        this.fetchInfo()
        /*try {
            this.setState({userLoggedIn: JSON.parse(window.localStorage.getItem('userLoggedIn'))})
            this.setState({user: JSON.parse(window.localStorage.getItem('loggedUser'))})

        } catch (e) {
            console.log(e)
        }*/
        if (JSON.parse(window.localStorage.getItem('userLoggedIn'))) {
            lichessService.getUserBlitzElo(this.state.user.lichess.name).then(elo => {
                const user = this.state.user
                user.lichess.elo = elo
                this.setState({user: user})
            })
            chessDotComService.getUserBlitzElo(this.state.user.chessDotCom.name).then(elo => {
                const user = this.state.user
                user.chessDotCom.elo = elo
                this.setState({user: user})
            })
            lichessService.getTotalGamesPlayed(this.state.user.lichess.name).then(count => {
                const user = this.state.user
                user.lichess.total_games = count
                this.setState({user: user})
            })
            chessDotComService.getTotalGamesPlayed(this.state.user.chessDotCom.name).then(count => {
                const user = this.state.user
                user.chessDotCom.total_games = count
                this.setState({user: user})
            })
            messageService.getMessages().then(data => {
                this.setState({messages: data})
                console.log(data)
                console.log(this.state)
            })
        }

    }

    fetchInfo = async () => {
        const request = axios.get("http://localhost:2000/api/users/info")
        const data = await request.then(res => res.data)
        this.setState({info: data})
    }

    logUserIn = () => async (event) => {
        event.preventDefault()
        const loginable = {
            name: this.state.user.name,
            password: this.state.user.password
        }
        const request = axios.post("http://localhost:2000/api/users/login", loginable)
        const data = await request.then(response => response.data)
        if (data.name) {
            console.log(data)
            const user = this.state.user
            user.name = data.name
            user.chessDotCom.name = data.chessDotComName
            user.lichess.name = data.lichessName
            user.major = data.major
            user.r2play = data.r2play
            this.setState({user: user})
            this.setState({userLoggedIn: true})
            window.localStorage.setItem('loggedUser', JSON.stringify(user))
            window.localStorage.setItem('userLoggedIn', true)
            this.componentWillMount()
        } else {
            console.log("fail at logging in")
        }

    }

    handleUsernameChange = () => (event) => {
        const user = this.state.user
        console.log(this.state)
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
                name: "",
                elo: 0,
                total_games: 0
            },
            chessDotCom: {
                name: "",
                elo: 0,
                total_games: 0
            }
        }
        this.setState({user})
        this.setState({userLoggedIn: false})
        window.localStorage.setItem('userLoggedIn', false)
        this.fetchInfo()
    }

    toggleR2P = () => async () => {
        const user = this.state.user
        const ready = user.r2play
        if (ready) {
            user.r2play = false
        } else {
            user.r2play = true
        }
        this.setState({user: user})
        const puttable = {
            name: this.state.user.name,
            chessDotComName: this.state.user.chessDotCom.name,
            lichessName: this.state.user.lichess.name,
            major: this.state.user.major,
            r2play: user.r2play,
            password: this.state.user.password
        }
        const request = axios.put(`http://localhost:2000/api/users/${this.state.user.name}`, puttable)
        const data = await request.then(response => response.data)
        console.log(data)
        console.log(user.r2play)
    }

    render() {
        let profile = ""
        let chat = ""

        let login = ""
        let signup = ""
        let or = ""
        let sayLogin = ""

        if (this.state.userLoggedIn) {
            profile = <Profile
                user={this.state.user}
                logoutFunc={this.logout()}
                toggleR2P={this.toggleR2P()}/>
            console.log('h')
            console.log(this.state.messages)
            chat = <Chat
                messages={this.state.messages}
                sendMessage={(event) => {
                    event.preventDefault()
                    messageService.sendMessage()
                }}
            />
        } else {
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


                {<Info
                    totalUsers={this.state.info.totalUsers}
                    readyUsers={this.state.info.usersReady}/>}
                {profile}
                <div className="loginDialog">{sayLogin}</div>
                <div>{login}</div>
                <div className="loginDialog">{or}</div>
                <div>{signup}</div>
                <div>{chat}</div>

            </div>
        );
    }
}

export default App;
