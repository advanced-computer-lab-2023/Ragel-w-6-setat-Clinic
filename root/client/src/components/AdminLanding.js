import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BodyContainer } from "../styles/registrationOptionsStyle";

const Container = styled.div`
  background-color: #b3e5fc; /* Light Primary Color */
  display: flex;
  flex-direction: row; /* Horizontal layout */
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  background-color: #0288d1; /* Dark Primary Color */
  color: #ffffff; /* Text/Icons Color */
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  margin-right: 10px; /* Add margin between buttons */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #448aff; /* Accent Color */
  }
`;

function AdminPanel() {
  return (
    <BodyContainer>
      <Container>
        <Link to="/admin/addadmin">
          <Button>Add Admin</Button>
        </Link>
        <Link to="/admin/removeuser">
          <Button>Remove A User</Button>
        </Link>
        <Button>Doctor Applications</Button>
        <Button>Package Management</Button>
      </Container>
    </BodyContainer>
  );
}

export default AdminPanel;
