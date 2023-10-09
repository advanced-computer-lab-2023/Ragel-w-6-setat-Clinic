import React from "react";
import {
  BodyContainer,
  Form,
  LoginContainer,
  Label,
  Input,
  Button,
  StyledLink,
} from "../styles/loginStyle.js";

function Login() {
  console.log("Login.js");
  return (
    <BodyContainer>
      <LoginContainer>
        <h1>Login</h1>
        <Form>
          <Label>
            Email:
            <Input type="email" name="email" />
          </Label>
          <Label>
            Password:
            <Input type="password" name="password" />
          </Label>
          <Button type="submit">Login</Button>
        </Form>

        <StyledLink to="/registration">
          Don't have an account? Register here.
        </StyledLink>
      </LoginContainer>
    </BodyContainer>
  );
}

export default Login;
