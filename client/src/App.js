import React, {useState, useEffect} from "react";
import axios from "axios";

import MessageBoard from "./components/MessageBoard";
import Controls from "./components/Controls";

import "./App.css";
const App = () => {

  const [allMessages, setAllMessages] = useState([]);
  const [messageComments, setMessageComments] = useState([]);

  const [currentMessage, setCurrentMessage] = useState(undefined);

  // retrieve all messages upon page load
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

  // retrieve message comments
  // useEffect(() => {

  //   console.log("getting comments...")

  //   allMessages.forEach(message => {

  //       axios.get("http://localhost:5000/api/posts/" + message.id + "/comments")
  //       .then(comments => {
  //           console.log("comments from message:", comments.data);
  //           setMessageComments({...messageComments, [message.id]: comments.data});

                // too much state updating...add to object, and set state outside of the forEach

  //       })
  //       .catch(commentsError => {
  //           // console.log("error getting comments for messages:", commentsError);
  //       })

  //     })
  // }, [allMessages])

  // retrieve message comments for a specific ID
useEffect(() => {

    console.log("getting comments...")

    axios.get("http://localhost:5000/api/posts/" + currentMessage + "/comments")
    .then(comments => {
        console.log("comments from message:", comments.data);
        setMessageComments(comments.data);
    })
    .catch(commentsError => {
        console.log("error getting comments for messages:", commentsError);
    })

  }, [currentMessage])

  console.log("comments:", allMessages, messageComments);

  return (
    <div className="app">
      <h1>Lord of the Rings Messageboard</h1>
      <div className="mainContent">
        <MessageBoard allMessages={allMessages} messageComments={messageComments} currentMessage={currentMessage} setCurrentMessage={setCurrentMessage} />
        <Controls currentMessage={currentMessage} messageComments={messageComments} />
      </div>
    </div>
  );

  }

export default App;