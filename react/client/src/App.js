import React, { useState, useEffect } from "react";
import { getMessages, sendMessage } from './api';

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(null);

    useEffect(() => {
      getMessages().then((msg) => {
        setMessages(msg);
      });
    });

    function submit() {
      sendMessage(message);
    }

    if (messages === null) {
      return <p>Loading...</p>;
    }

    return (
       <React.Fragment>
         <div>
           <form
             action="http://localhost:3000/"
             method="POST"
             onSubmit={e => {
               submit(e);
               e.preventDefault();
             }}
           >
             <input
               onChange={e => {
                setMessage(e.target.value);
               }}
               id="Input"
               type="text"
               name="message"
             />
             <input type="submit" value="Submit" />
           </form>
         </div>
         <ul>
           { messages.map((message) => {
             return (<li key={message.id}>{message.message}</li>);
           }) }
         </ul>
       </React.Fragment>
    )
}

export default App;
