import React from "react";

const Message = ({title, contents}) => {

    return (
        <div className="message">
            <h3 className="messageTitle">{title}</h3>
            <p className="messageContents"> ~ {contents}</p>
        </div>
    )
}

export default Message;