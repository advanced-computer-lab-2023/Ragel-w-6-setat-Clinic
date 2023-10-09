import React, { useState } from "react";
import {
  BodyContainer,
  PatientRegistrationContainer,
  Header1,
  Header2,
  Form,
  Label,
  Input,
  Button,
  Select,
} from "../styles/registrationStyle.js";

function PatientRegistration() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    mobileNumber: "",
    emergencyContact: {
      fullName: "",
      mobileNumber: "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEmergencyContactChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      emergencyContact: {
        ...formData.emergencyContact,
        [name]: value,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend API)
    console.log("Form submitted:", formData);
  };

  return (
    <BodyContainer>
      <PatientRegistrationContainer>
        <Header1>Patient Registration</Header1>
        <Form onSubmit={handleSubmit}>
          <Label>
            Username:
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Name:
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Email:
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Password:
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Date of Birth:
            <Input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </Label>
          <Label>
            Gender:
            <Select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
          </Label>
          <Label>
            Mobile Number:
            <Input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              pattern="[0-9]{10}"
              required
            />
          </Label>
          <Header2>Emergency Contact</Header2>
          <Label>
            Full Name:
            <Input
              type="text"
              name="fullName"
              value={formData.emergencyContact.fullName}
              onChange={handleEmergencyContactChange}
              required
            />
          </Label>
          <Label>
            Mobile Number:
            <Input
              type="tel"
              name="mobileNumber"
              value={formData.emergencyContact.mobileNumber}
              onChange={handleEmergencyContactChange}
              pattern="[0-9]{10}"
              required
            />
          </Label>
          <Button type="submit">Register</Button>
        </Form>
      </PatientRegistrationContainer>
    </BodyContainer>
  );
}

export default PatientRegistration;
