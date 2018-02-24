import axios from 'axios'
const baseUrl = 'https://lichess.org/api/user'

const getUser = (userName) => {
    const request = axios.get(`${baseUrl}/${userName}`)
    return request.then(res => res.data)
}

const getUserRapidElo = (userName) => {
    const request = axios.get(`${baseUrl}/${userName}`)
    return request.then(res => res.data.perfs.rapid.rating)
}

const getUserBlitzElo = (userName) => {
    const request = axios.get(`${baseUrl}/${userName}`)
    return request.then(res => res.data.perfs.blitz.rating)
}

const getTotalGamesPlayed = (userName) =>{
    const request = axios.get(`${baseUrl}/${userName}`)
    return request.then(res => res.data.count.all)
}

export default {getUser, getUserRapidElo, getUserBlitzElo, getTotalGamesPlayed}