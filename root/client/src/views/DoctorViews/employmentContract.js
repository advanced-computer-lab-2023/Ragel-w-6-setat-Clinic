import React, { useState, useContext, useEffect } from "react";
import ReactDatetime from "react-datetime";
import {
  Button,
  Card,
  CardHeader,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  CardBody,
  FormGroup,
  Form,
  Container,
  Row,
  Col,
  Badge,
  Media,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";

import UserHeader from "components/Headers/UserHeader.js";
import { chartOptions, parseOptions } from "variables/charts.js";
import { UserContext } from "../../contexts/UserContext";

const DoctorContracts = () => {
  const toggleModal = () => setModal(!modal);
  const { user } = useContext(UserContext);

 

  return (
    <>
     
    </>
  );
};

export default DoctorAppointments;
