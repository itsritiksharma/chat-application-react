import React, {useRef, useEffect, useState} from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect("https://enigmatic-brook-90035.herokuapp.com")

function App() {
  const messageRef = useRef();
  const [message, setMessage] = useState([]);

  const submitHandler = (event) => {
    event.preventDefault();
    socket.emit("send_message", {message: messageRef.current.value})
  }
  useEffect(()=>{
    socket.on("received_message", (data)=>{
      setMessage(data.message);
    })
  }, [socket])
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input ref={messageRef}  placeholder='Message...' />
        <button type="submit">Send</button>
        <h1>{message}</h1>
      </form>
    </div>
  );
}

export default App;
