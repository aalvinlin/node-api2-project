import React from "react";

const Controls = ({currentMessage, messageComments}) => {

    return (
        <div className="controls parchment">
            <h2>{messageComments.length === 0 ? "No" : messageComments.length} Comments</h2>
            <div className="comments">
                {
                    messageComments.map(comment => {
                        return <p className="comment" key={comment.id}>{comment.text}</p>;
                    })
                }
                
            </div>
        </div>
    )
}

export default Controls;