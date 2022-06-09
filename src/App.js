import React, {useRef} from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect("http://localhost:3001")

function App() {
  const messageRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    socket.emit("send_message", {message: messageRef.current.value})
  }
  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input ref={messageRef} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default App;
