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

const Container = styled.div`
  background-color: #0288d1; /* Dark Primary Color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const Header1 = styled.h1`
  color: #ffffff; /* Text/Icons Color */
  margin-bottom: 20px;
`;

const UnorderedList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  margin-bottom: 15px;
`;

const StyledLink = styled(Link)`
  color: #03a9f4; /* Primary Color */
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #448aff; /* Accent Color */
  }
`;

export {
  BodyContainer,
  Container,
  Header1,
  UnorderedList,
  ListItem,
  StyledLink,
};
