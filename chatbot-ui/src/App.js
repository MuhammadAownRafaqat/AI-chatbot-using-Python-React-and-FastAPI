import React, {useState} from 'react';
import axios from 'axios';
import './App.css'

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessages = [...messages, { sender: 'user', text: input }];
    setMessages(newMessages);
    const currentInput = input;
    setInput('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/chat', { message: currentInput });

      const botText = response.data.reply || response.data.error;
      setMessages([...newMessages, { sender: 'bot', text: botText }]);
    } catch (error) {
      setMessages([...newMessages, { sender: 'bot', text: "Is the backend running?"}]);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h2>My AI Assistant</h2>
        <div className="chat-box">
          {messages.map((msg,i) => (
            <div key={i} className={`message ${msg.sender}`}>
              <strong>{msg.sender === 'user' ? 'You: ' : 'AI: '}</strong>
              {msg.text}
              </div>
          ))}
          </div>
          <form onSubmit={sendMessage}>
            <input 
            value = {input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            />
            <button type="submit">Send</button>
          </form>
        </header>
      </div>
  );
}

export default App;