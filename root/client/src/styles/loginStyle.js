import styled from "styled-components";
import { Link } from "react-router-dom";

const BodyContainer = styled.body`
  background-color: #b3e5fc; /* Light Primary Color */
  color: #212121; /* Primary Text Color */
  font-family: Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  margin: 0;
`;

const LoginContainer = styled.div`
  background-color: #0288d1; /* Dark Primary Color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 10px;
  color: #ffffff; /* Text/Icons Color */
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 15px;
  border: 1px solid #ffffff; /* Text/Icons Color */
  border-radius: 5px;
  background-color: transparent;
  color: #ffffff; /* Text/Icons Color */
`;

const Button = styled.button`
  background-color: #03a9f4; /* Primary Color */
  color: #ffffff; /* Text/Icons Color */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #448aff;
  }
`;

const StyledLink = styled(Link)`
  color: #212121;
  text-decoration: none;
  margin-top: 15px;
  &:hover {
    text-decoration: underline;
    background-color: #0288d1;
  }
`;

const Header1 = styled.h1`
  color: #ffffff; /* Text/Icons Color */
  margin-bottom: 20px;
`;

export {
  BodyContainer,
  LoginContainer,
  Header1,
  Form,
  Label,
  Input,
  Button,
  StyledLink,
};
