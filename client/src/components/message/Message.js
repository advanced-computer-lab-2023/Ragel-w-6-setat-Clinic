

import "./message.css";
import { format } from "timeago.js";

export default function Message({  message,own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={require("../../assets/img/theme/team-4-800x800.jpg")}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}