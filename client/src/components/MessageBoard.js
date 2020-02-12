import React, { useEffect, useState} from "react";
import axios from "axios";

import Message from "./Message";

const MessageBoard = () => {

    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:5000/api/posts")
            .then(response => {
                console.log("response from GET all messages:", response.data);
                setAllMessages(response.data);
            })
            .catch(error => {
                console.log("error from GET all messages:", error);
            })

    }, [])

    return (
        <>
            <h1>Lord of the Rings Messageboard</h1>
            {allMessages.map(message => {

                return <Message key={message.id} title={message.title} contents={message.contents} />;

            }
            )}
        </>
    )
}

export default MessageBoard