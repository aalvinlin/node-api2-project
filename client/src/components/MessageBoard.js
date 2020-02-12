import React, { useEffect, useState} from "react";
import axios from "axios";

const MessageBoard = () => {

    const [allMessages, setAllMessages] = useState([]);

    useEffect(() => {

        axios.get("http://localhost:5000/api/posts")
            .then(response => {
                console.log("response from GET all messages:", response);
                setAllMessages(response);
            })
            .catch(error => {
                console.log("error from GET all messages:", error);
            })

    }, [])

    return (
        <>
            <h1>Lord of the Rings Messageboard</h1>
            {allMessages.map((message, id) => {
                <p key={id}>{message}</p>
            })}
        </>
    )
}

export default MessageBoard