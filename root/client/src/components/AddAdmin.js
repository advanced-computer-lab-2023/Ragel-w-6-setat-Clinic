import React, { useState } from "react";
import styled from "styled-components";
import { BodyContainer } from "../styles/loginStyle.js";

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

const InputLabel = styled.label`
  color: #212121; /* Primary Text Color */
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

function AddAdministrator() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [admins, setAdmins] = useState([]);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleAddAdmin = () => {
    if (username && password) {
      // Assuming admin object has an id for unique identification
      const newAdmin = { id: admins.length + 1, username, password };
      setAdmins([...admins, newAdmin]);
      setUsername("");
      setPassword("");
      alert("New administrator added successfully!");
    } else {
      alert("Username and password are required!");
    }
  };

  return (
    <BodyContainer>
      <Container>
        <Heading>Add Administrator</Heading>
        <InputLabel>Username:</InputLabel>
        <Input type="text" value={username} onChange={handleUsernameChange} />
        <InputLabel>Password:</InputLabel>
        <Input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <Button onClick={handleAddAdmin}>Add Administrator</Button>
      </Container>
    </BodyContainer>
  );
}

export default AddAdministrator;
