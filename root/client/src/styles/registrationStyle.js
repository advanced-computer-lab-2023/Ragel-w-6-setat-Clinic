import styled from "styled-components";

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

const PatientRegistrationContainer = styled.div`
  background-color: #0288d1; /* Dark Primary Color */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  overflow: auto;
`;

const Header1 = styled.h1`
  color: #ffffff; /* Text/Icons Color */
  margin-bottom: 20px;
`;

const Header2 = styled.h2`
  color: #ffffff; /* Text/Icons Color */
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  display: block;
  margin-top: 15px;
  color: #ffffff; /* Text/Icons Color */
`;

const Input = styled.input`
  width: calc(100% - 30px);
  padding: 8px;
  border: 1px solid #ffffff; /* Text/Icons Color */
  border-radius: 5px;
  background-color: transparent;
  color: #212121; /* Text/Icons Color */
  margin-top: 5px;
`;

const Select = styled.select`
  width: calc(100% - 30px);
  padding: 8px;
  border: 1px solid #ffffff; /* Text/Icons Color */
  border-radius: 5px;
  background-color: transparent;
  color: #212121; /* Text/Icons Color */
  margin-top: 5px;

  &:focus {
    outline: none;
    border-color: #03a9f4; /* Primary Color */
  }
`;

const Button = styled.button`
  background-color: #03a9f4; /* Primary Color */
  color: #ffffff; /* Text/Icons Color */
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #448aff;
  }
`;

export {
  BodyContainer,
  PatientRegistrationContainer,
  Header1,
  Header2,
  Form,
  Label,
  Input,
  Button,
  Select,
};
