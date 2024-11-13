
const Message = ({ message }) => {
console.log(message)
  return (
    <div>

<div className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt=""
        src="" />
    </div>
  </div>
  <div className="chat-header">
    {message.displayName}
  </div>
  <div className="chat-bubble">{message.text}</div>
</div>

</div>
  )
}

export default Message;