import axios from 'axios'

const baseUrl = 'https://api.chess.com/pub/player'
//https://api.chess.com/pub/player/evanschess1/stats


const getUserBlitzElo = (username) => {
    const request = axios.get(`${baseUrl}/${username}/stats`)
    return request.then(res => res.data.chess_blitz.last.rating)
}

const getStats = (username) => {
    const request = axios.get(`${baseUrl}/${username}/stats`)
    return request.then(res => res.data)
}

const getTotalGamesPlayed = (username) => {//DOESNT RETURN PROMISE BUT MAKES THE CALCS
    let sum = 0;
    console.log(username)
    const request = axios.get(`${baseUrl}/${username}/stats`)
    return request
        .then(res => res.data)
        .then(data => {
            const daily = data.chess_daily.record;
            const rapid = data.chess_rapid.record;
            const blitz = data.chess_blitz.record;
            const bullet = data.chess_bullet.record;
            sum += daily.win + daily.loss + daily.draw;
            sum += rapid.win + rapid.loss + rapid.draw;
            sum += blitz.win + blitz.loss + blitz.draw;
            sum += bullet.win + bullet.loss + bullet.draw;
        }).then(() => {
            return sum;
        }).catch((error) => {
            console.log(error);
            return 0;
        })

}

export default {getUserBlitzElo, getStats, getTotalGamesPlayed}