import "./App.css";
import "normalize.css";
import { SipsTea } from "./SipsTea";
import { useState, useEffect } from "react";
import { Popup } from "./Popup";
import React from "react";
import { ChatMessage } from "./ChatMessage";

function App() {
  const [input, setInput] = useState("");
  const [chatLog, setChatLog] = useState([
    {
      user: "gpt",
      message:
        "Lets Kiki! Type something into the chat and Mama will try her best to help you out!",
    },
  ]);

  function clearChat() {
    setChatLog([
      {
        user: "gpt",
        message:
          "Lets Kiki! Type something into the chat and Mama will try her best to help you out!",
      },
    ]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let chatLogNew = [...chatLog, { user: "me", message: input }];
    setInput("");
    setChatLog(chatLogNew);
    const messages = chatLogNew.map((message) => message.message).join("\n");
    // fetch request to the API combining the chat log array of messages and sending it as a messages and sending it as a message to localhost:3080 as a post
    const response = await fetch("http://localhost:3080/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: messages,
      }),
    });

    const data = await response.json();
    setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}` }]);
  }

  const [showScrollButton, setShowScrollButton] = useState(false);


  useEffect(() => {
    const chatLogElement = document.querySelector('.chat-log');
    
    const handleScroll = () => {
      const scrollTop = chatLogElement.scrollTop;
      const scrollHeight = chatLogElement.scrollHeight;
      const clientHeight = chatLogElement.clientHeight;
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight;
      
      setShowScrollButton(!isScrolledToBottom);
    };
    
    chatLogElement.addEventListener('scroll', handleScroll);
    
    return () => {
      chatLogElement.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToBottom = () => {
    const chatLogElement = document.querySelector('.chat-log');
    chatLogElement.scrollTo({ top: chatLogElement.scrollHeight, behavior: 'smooth' });
  };
  


  return (
    <div className="App">
      <Popup />
      <SipsTea clearChat={clearChat} />
      <section className="queerBot">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
            {showScrollButton && (
              <button className="scroll-button" onClick={scrollToBottom}>
                Scroll to Bottom
              </button>
            )}
        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <input
              className="chat-input-text-area"
              placeholder="Type your tea here and lets kiki sis!"
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          </form>
        </div>
      </section>
    </div>
  );
}


export default App;
