import React from "react";
import {
  BodyContainer,
  Container,
  Header1,
  UnorderedList,
  ListItem,
  StyledLink,
} from "../styles/registrationOptionsStyle.js";

function RegistrationOptions() {
  return (
    <BodyContainer>
      <Container>
        <Header1>Registration Options</Header1>
        <UnorderedList>
          <ListItem>
            <StyledLink to="/registration/admin">Register as Admin</StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/registration/doctor">
              Register as Doctor
            </StyledLink>
          </ListItem>
          <ListItem>
            <StyledLink to="/registration/patient">
              Register as Patient
            </StyledLink>
          </ListItem>
        </UnorderedList>
      </Container>
    </BodyContainer>
  );
}

export default RegistrationOptions;
