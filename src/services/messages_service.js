import axios from 'axios'
const baseUrl = "http://localhost:2000/api/messages"

const getMessages = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const sendMessage = () => {
    alert('Not implemented due to excessive overweight. Sorry')
}

export default {getMessages, sendMessage}