import React from 'react'

const Chat = ({messages, alterMessage, sendMessage}) => {/*public chat window, messages stacked and input + send button*/
    const msgArray = Object.keys(messages)

    return (
        <div>
            JULKINEN CHAT:
            <div className="allMessages">
                {msgArray.length > 0 ? msgArray.map(message => <Message message={messages[message]}/>) : ""}
            </div>
            <form className="messageForm" onSubmit={sendMessage}>
                <div><textarea type="text" placeholder="Uusi viesti" onChange={alterMessage}/></div>
                <div><button type="submit">Lähetä</button></div>
            </form>
        </div>
    )
}

const Message = message => {
    return (
        <div className="message">
            <div className="messageContent">{message.message.content}</div>
            <div className="messageSender">Lähettäjä: {message.message.user}, {message.message.time}</div>
        </div>
    )
}

export default Chat