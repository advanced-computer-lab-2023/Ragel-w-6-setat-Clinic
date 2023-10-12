import React, { useState } from "react";
import {
  BodyContainer,
  RemoveContainer,
  Header,
  Form,
  Label,
  Input,
  Button,
} from "./removeGeneralStyles"; // Importing the styled components

function RemoveGeneral() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRemove = () => {
    // Here, you can implement logic to remove the user with the given username from the system
    // For demonstration purposes, let's assume an alert message is shown indicating the removal
    if (username) {
      setMessage(`User '${username}' has been removed from the system.`);
      setUsername(""); // Clear the input field
    } else {
      setMessage("Please enter a username.");
    }
  };

  return (
    <BodyContainer>
      <RemoveContainer>
        <Header>Remove User</Header>
        <Form>
          <Label>Username:</Label>
          <Input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Enter username"
          />
          <Button onClick={handleRemove}>Remove</Button>
        </Form>
        {message && <p>{message}</p>}
      </RemoveContainer>
    </BodyContainer>
  );
}

export default RemoveGeneral;






