import React, { useState } from "react";
import {
  BodyContainer,
  PatientRegistrationContainer,
  Header1,
  Form,
  Label,
  Input,
  Button,
} from "../styles/registrationStyle.js";

const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliation: "",
    education: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <BodyContainer>
      <PatientRegistrationContainer>
        <Header1>Doctor Registration</Header1>
        <Form onSubmit={handleSubmit}>
          <Label>
            Username:
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Name:
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Email:
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Password:
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Date of Birth:
            <Input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Hourly Rate:
            <Input
              type="text"
              name="hourlyRate"
              value={formData.hourlyRate}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Affiliation (Hospital):
            <Input
              type="text"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Label>
            Educational Background:
            <Input
              type="text"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              required
            />
          </Label>
          <Button type="submit">Register</Button>
        </Form>
      </PatientRegistrationContainer>
    </BodyContainer>
  );
};

export default DoctorRegistration;
