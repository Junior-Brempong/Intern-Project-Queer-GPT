import "./App.css";
import "normalize.css";
import { SipsTea } from "./SipsTea";
import { useState } from "react";
import { Popup } from "./Popup";
import React from "react";

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
    setChatLog([]);
  }

  function handleClick(e) {
    if (e) {
      alert("TEST");
    }
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
    console.log(data.message);
  }

  return (
    <div className="App">
      <Popup handleClick={handleClick} />
      <SipsTea clearChat={clearChat} />
      <section className="queerBot">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
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

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user === "gpt" && "chatgpt"}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gpt" && "chatgpt"}`}>
          {message.user === "gpt" ? (
            <img
              src="https://thewildcattribune.com/wp-content/uploads/2023/05/52890928681_a467a529c4_o-e1685030922246-900x860.jpg"
              alt="Icon"
              className="icon"
            ></img>
          ) : (
            <img
              src="https://img.freepik.com/premium-vector/cute-kawaii-cats-kittens-pastel-design-funny-cartoon-print-sticker-design_685067-2220.jpg"
              alt="Icon"
              className="icon"
            ></img>
          )}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default App;
