import React from "react";

const Message = ({id, title, contents, comments, currentMessage, setCurrentMessage}) => {

    const updateCurrentMessage = () => {

        if (id !== currentMessage)
            {
                setCurrentMessage(id);
            }
    }

    return (
        <div className="message parchment" onMouseOver={updateCurrentMessage}>
            <h3 className="messageTitle">{title}</h3>
            <p className="messageContents"> ~ {contents}</p>
            {/* <div className="comments">
                {comments.map(comment => {
                    return <p className="comment" key={comment.id}>{comment.text}</p>;
                })}
            </div> */}
        </div>
    )
}

export default Message;