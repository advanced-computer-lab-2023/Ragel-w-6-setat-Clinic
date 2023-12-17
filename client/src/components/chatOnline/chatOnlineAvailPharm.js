import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for prop type validation
import "./chatOnline.css";

const ChatOnline = ({ availableUsers, currentId, setCurrentChat }) => {
  const [pharmacists, setPharmacists] = useState([]);
  const [onlinePharmacists, setOnlinePharmacists] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  console.log("availableUsers:", availableUsers);
  console.log("pharmacists:", pharmacists);
  console.log("onlinePharmacists:", onlinePharmacists);

  // useEffect(() => {
  //   const fetchAvailablePharmacists = async () => {
  //     const response = await fetch('/api/admin/getPharmacistsInfo');
  //     const json = await response.json();
  //     if (response.ok) {
  //       setPharmacists(json);
  //     }
  //   };
  //   fetchAvailablePharmacists();
  // }, [currentId]);

  // useEffect(() => {
  //   // Ensure that availableUsers is an array before using the includes method
  //   if (Array.isArray(availableUsers)) {
  //     setOnlinePharmacists(pharmacists.filter((f) => availableUsers.includes(f._id)));
  //   }
  // }, [pharmacists, availableUsers]);

  const handleClick = async (user) => {
    try {
      const response = await fetch(`/conversation/find/${currentId}/${user._id}`);
      const json = await response.json();
      setCurrentChat(json);
    } catch (err) {
      console.log(err);
    }
  };

  /*
  
   const setCurrentChatFunction = async (c) => {
    try {
      // Find an existing conversation with the selected pharmacist
      // const response = await fetch(`/conversation/find/${patientId}/${selectedUser._id}`);
      // const existingConversation = await response.json();

      if (c._id) {
        // If conversation exists, set it as the current chat
        setCurrentChat(c);
      } else {
        // If no conversation exists, create a new one
        const newConversationResponse = await fetch("/conversation", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            senderId: patientId,
            receiverId: c._id,
          }),
        });

        const newConversation = await newConversationResponse.json();
        setCurrentChat(newConversation);
      }
    } catch (error) {
      console.error("Error setting current chat:", error);
    }
  };

  */

  return (
    <div className="chatOnline">
     
    
    </div>
  );
};

// Define prop types for type validation
ChatOnline.propTypes = {
  availableUsers: PropTypes.array.isRequired,
  currentId: PropTypes.string.isRequired,
  setCurrentChat: PropTypes.func.isRequired,
};

export default ChatOnline;
