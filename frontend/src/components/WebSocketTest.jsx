import { useState } from 'react';
import { StompSessionProvider, useSubscription } from 'react-stomp-hooks';

const WebSocketTest = () => {
  return (
    <StompSessionProvider url={'http://localhost:3001/ws'}>
      <ChildComponent />
    </StompSessionProvider>
  );
};

const ChildComponent = () => {
  const [message, setMessage] = useState([]);
  useSubscription('/topic/seats', (newMessage) => {
    setMessage((prevMessage) => [...prevMessage, newMessage.body]);
  });

  return (
    <div>
      <p>The broadcast message from websocket broker is</p>

      <ul>
        {message.map((msg, index) => (
          <li key={index}>{JSON.stringify(msg)}</li>
        ))}
      </ul>
    </div>
  );
};

export default WebSocketTest;
