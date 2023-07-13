export const ChatMessage = ({ message }) => {
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