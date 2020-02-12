import React from "react";

import Message from "./Message";

const MessageBoard = ({allMessages, messageComments, currentMessage, setCurrentMessage}) => {

    return (
        <div className="messageBoard">
            {allMessages.map(message => {
                return <Message key={message.id} id={message.id} title={message.title} contents={message.contents} comments={messageComments[message.id]} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} />;
            })}

        </div>
    )
}

export default MessageBoard