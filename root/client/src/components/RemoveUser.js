import React, { useState } from "react";
import styled from "styled-components";
import { BodyContainer } from "../styles/registrationStyle";

// Styled components
const Container = styled.div`
  background-color: #0288d1; /* Light Primary Color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto;
  text-align: center;
`;

const Heading = styled.h2`
  color: #ffffff; /* Dark Primary Color */
  margin-bottom: 20px;
`;

const Label = styled.label`
  color: #ffffff; /* Primary Text Color */
  display: block;
  margin-top: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ffffff; /* Dark Primary Color */
  border-radius: 5px;
  background-color: transparent;
  color: #212121; /* Primary Text Color */
  margin-top: 5px;
`;
const Select = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #ffffff; /* Dark Primary Color */
  border-radius: 5px;
  background-color: transparent;
  color: #212121; /* Primary Text Color */
  margin-top: 5px;
`;

const Button = styled.button`
  background-color: #03a9f4; /* Primary Color */
  color: #ffffff; /* Text/Icons Color */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #448aff; /* Accent Color */
  }
`;

function RemoveUser() {
  const [username, setUsername] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleRemoveUser = () => {
    // Logic to remove user by username
    if (username) {
      // Implement your removal logic here
      alert(`User with username "${username}" removed successfully!`);
      setUsername("");
    } else {
      alert("Please enter a valid username!");
    }
  };

  return (
    <BodyContainer>
      <Container>
        <Heading>Remove User</Heading>
        <Label>Select User Type:</Label>
        <Select>
          <option value="doctor">Doctor</option>
          <option value="patient">Patient</option>
          <option value="admin">Admin</option>
        </Select>
        <Label>Enter Username:</Label>
        <Input type="text" value={username} onChange={handleUsernameChange} />
        <Button onClick={handleRemoveUser}>Remove User</Button>
      </Container>
    </BodyContainer>
  );
}

export default RemoveUser;
