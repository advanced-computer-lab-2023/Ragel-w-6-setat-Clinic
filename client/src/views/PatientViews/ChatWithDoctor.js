import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardText,
  Container,
  Row,
  Button,
} from "reactstrap";

import { AuthContext } from "../../contexts/AuthContext";
import "./Chat.css";
import Conversations from "components/conversations/Conversation.js";
import Message from "components/message/Message.js";
import ChatOnline from "components/chatOnline/chatOnlineAvailPharm";
import { useRef } from "react";
import io from "socket.io-client"; // Import io from socket.io-client

const ChatWithDoctor = () => {
  // Use AuthContext to get user information, including the token
  const { user } = useContext(AuthContext);
  const userID=user.user._id;

  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [availableUsers, setAvailableUsers] = useState([]);
  const socket = useRef();
  const scrollRef = useRef();
  const patientId = userID;

  const [forceRerender, setForceRerender] = useState(0);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");

    const interval = setInterval(() => {
      setForceRerender((prev) => prev + 1);
    }, 50);

    return () => {
      clearInterval(interval);
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    const getMessages = async () => {
      try {
        if (currentChat) {
          const response = await fetch(`/message/${currentChat._id}`, {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const data = await response.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [currentChat, forceRerender]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", userID);
    console.log("userID", userID);
    socket.current.on("getUsers", (users) => {});
  }, [user.user]);

  const forceUpdate = useCallback(() => {
    setConversations((prev) => prev);
  }, []);

  const getConversations = async () => {
    try {
      const response = await fetch(`/conversation/${userID}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setConversations(data);
        forceUpdate();
      } else {
        console.log("Error fetching conversations:", response);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getConversations();
    forceUpdate();
  }, [userID]);

  useEffect(() => {
    const fetchAndCreateConversations = async () => {
      try {
        const doctorsIHaveAppointmentsWith = await fetch(
          `/patients/myDoctors/${userID}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        
        const doctorsIHaveAppointmentsWithData =
          await doctorsIHaveAppointmentsWith.json();
          const doctorsWithoutConversation = doctorsIHaveAppointmentsWithData.filter((doctor) => {
            return !conversations.some((conversation) => 
              conversation.members.includes(doctor._id)&&
              conversation.members.includes(patientId)
            );
          });

          // Create conversations for pharmacists without existing conversations
          for (const doctor of doctorsWithoutConversation) {
            const newConversationResponse = await fetch("/api/conversation", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
              body: JSON.stringify({
                senderId: patientId,
                receiverId: doctor._id,
              }),
            });
            const newConversation = await newConversationResponse.json();

          
           
  // Emit the new conversation event to the server
            socket.current.emit('newConversation', newConversation);
  
            setConversations((prevConversations) => [...prevConversations, newConversation]);
            forceUpdate();
          
        }
      } catch (err) {
        console.error(err);
      }
    };

      fetchAndCreateConversations();
      
  }, [conversations,forceUpdate, patientId, user.token]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await fetch(`/message/${currentChat?._id}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    getMessages();
  }, [currentChat, user.token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: patientId,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== patientId
    );

    socket.current.emit("sendMessage", {
      senderId: patientId,
      receiverId,
      text: newMessage,
    });

    try {
      console.log("receiverIdddd", receiverId)

      const response = await fetch("/message/", {
        method: "POST",
        body: JSON.stringify(message),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await response.json();
      setMessages((prev) => [...prev, data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              placeholder="Search for friends"
              className="chatMenuInput"
            />
            {conversations &&
              conversations.map((c) => (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                  <Conversations
                    key={c._id}
                    conversation={c}
                    currentUser={user.user}
                  />
                </div>
              ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages &&
                    messages.map((m) => (
                      <div ref={scrollRef}>
                        <Message message={m} own={m.sender === patientId} />
                      </div>
                    ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button
                    className="chatSubmitButton"
                    onClick={handleSubmit}
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat with a doctor
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              availableUsers={availableUsers}
              currentId={patientId}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatWithDoctor;
