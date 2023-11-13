import React, { useState, useContext, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Label,
  Form,
  FormGroup,
} from "reactstrap";

import { UserContext } from "../../contexts/UserContext";

const DoctorContracts = () => {
  const { user } = useContext(UserContext);

  // State for contract details
  const [contractDetails, setContractDetails] = useState({
    doctorId: user._id,
    startDate: "",
    endDate: "",
    markup: 0,
    isApproved: false,
    termsAndConditions: "",
    noticePeriod: "",
    benefits: "",
    workingHours: "",
    overtimePolicy: "",
    leavePolicy: "",
    renewalTerms: "",
    terminationClause: "",
    nonDisclosureAgreement: false,
    nonCompeteClause: false,
    governingLaw: "",
  });

  // State for modal visibility
  const [modal, setModal] = useState(true);

  // Function to close the modal
  const closeModal = () => setModal(false);

  useEffect(() => {
    // Fetch contract details when component mounts
    const fetchContractDetails = async () => {
      try {
        const response = await fetch(`/doctors/viewContract/${user._id}`);
        const data = await response.json();

        const contracts = data.contracts;

        if (contracts.length > 0) {
          // Assuming you are using the first contract found
          const firstContract = contracts[0];
          setContractDetails(firstContract);
        }
      } catch (error) {
        console.error("Error fetching contract details:", error);
      }
    };

    fetchContractDetails();
  }, [user._id]);

  return (
    <>
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader>
                <h1>Contract Details</h1>
              </CardHeader>
              <CardBody>
                {/* Display contract details */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="startDate">Start Date</Label>
                      <Input
                        type="text"
                        id="startDate"
                        value={contractDetails.startDate}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="endDate">End Date</Label>
                      <Input
                        type="text"
                        id="endDate"
                        value={contractDetails.endDate}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* Add other rows for contract details */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="markup">Markup</Label>
                      <Input
                        type="text"
                        id="markup"
                        value={contractDetails.markup}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="isApproved">Approval Status</Label>
                      <Input
                        type="text"
                        id="isApproved"
                        value={contractDetails.isApproved ? "Approved" : "Pending"}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* Add other rows for contract details */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="termsAndConditions">Terms and Conditions</Label>
                      <Input
                        type="text"
                        id="termsAndConditions"
                        value={contractDetails.termsAndConditions}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="noticePeriod">Notice Period</Label>
                      <Input
                        type="text"
                        id="noticePeriod"
                        value={contractDetails.noticePeriod}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* Add other rows for contract details */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="benefits">Benefits</Label>
                      <Input
                        type="text"
                        id="benefits"
                        value={contractDetails.benefits}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="workingHours">Working Hours</Label>
                      <Input
                        type="text"
                        id="workingHours"
                        value={contractDetails.workingHours}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* Add other rows for contract details */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="overtimePolicy">Overtime Policy</Label>
                      <Input
                        type="text"
                        id="overtimePolicy"
                        value={contractDetails.overtimePolicy}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="leavePolicy">Leave Policy</Label>
                      <Input
                        type="text"
                        id="leavePolicy"
                        value={contractDetails.leavePolicy}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* Add other rows for contract details */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="renewalTerms">Renewal Terms</Label>
                      <Input
                        type="text"
                        id="renewalTerms"
                        value={contractDetails.renewalTerms}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="terminationClause">Termination Clause</Label>
                      <Input
                        type="text"
                        id="terminationClause"
                        value={contractDetails.terminationClause}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* Add other rows for contract details */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="nonDisclosureAgreement">Non-Disclosure Agreement</Label>
                      <Input
                        type="text"
                        id="nonDisclosureAgreement"
                        value={contractDetails.nonDisclosureAgreement ? "Yes" : "No"}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="nonCompeteClause">Non-Compete Clause</Label>
                      <Input
                        type="text"
                        id="nonCompeteClause"
                        value={contractDetails.nonCompeteClause ? "Yes" : "No"}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
                {/* Add other rows for contract details */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="governingLaw">Governing Law</Label>
                      <Input
                        type="text"
                        id="governingLaw"
                        value={contractDetails.governingLaw}
                        readOnly
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Contract Modal */}
      <Modal isOpen={modal} toggle={closeModal} centered>
        <ModalHeader toggle={closeModal}>Contract Details</ModalHeader>
        <ModalBody>
          <Form>
            {/* Display contract details in the modal */}
            <FormGroup>
              <Label for="startDate">Start Date</Label>
              <Input
                type="text"
                id="startDate"
                value={contractDetails.startDate}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="endDate">End Date</Label>
              <Input
                type="text"
                id="endDate"
                value={contractDetails.endDate}
                readOnly
              />
            </FormGroup>
            {/* Add other fields for contract details */}
            <FormGroup>
              <Label for="markup">Markup</Label>
              <Input
                type="text"
                id="markup"
                value={contractDetails.markup}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="isApproved">Approval Status</Label>
              <Input
                type="text"
                id="isApproved"
                value={contractDetails.isApproved ? "Approved" : "Pending"}
                readOnly
              />
            </FormGroup>
            {/* Add other fields for contract details */}
            <FormGroup>
              <Label for="termsAndConditions">Terms and Conditions</Label>
              <Input
                type="text"
                id="termsAndConditions"
                value={contractDetails.termsAndConditions}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="noticePeriod">Notice Period</Label>
              <Input
                type="text"
                id="noticePeriod"
                value={contractDetails.noticePeriod}
                readOnly
              />
            </FormGroup>
            {/* Add other fields for contract details */}
            <FormGroup>
              <Label for="benefits">Benefits</Label>
              <Input
                type="text"
                id="benefits"
                value={contractDetails.benefits}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="workingHours">Working Hours</Label>
              <Input
                type="text"
                id="workingHours"
                value={contractDetails.workingHours}
                readOnly
              />
            </FormGroup>
            {/* Add other fields for contract details */}
            <FormGroup>
              <Label for="overtimePolicy">Overtime Policy</Label>
              <Input
                type="text"
                id="overtimePolicy"
                value={contractDetails.overtimePolicy}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="leavePolicy">Leave Policy</Label>
              <Input
                type="text"
                id="leavePolicy"
                value={contractDetails.leavePolicy}
                readOnly
              />
            </FormGroup>
            {/* Add other fields for contract details */}
            <FormGroup>
              <Label for="renewalTerms">Renewal Terms</Label>
              <Input
                type="text"
                id="renewalTerms"
                value={contractDetails.renewalTerms}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="terminationClause">Termination Clause</Label>
              <Input
                type="text"
                id="terminationClause"
                value={contractDetails.terminationClause}
                readOnly
              />
            </FormGroup>
            {/* Add other fields for contract details */}
            <FormGroup>
              <Label for="nonDisclosureAgreement">Non-Disclosure Agreement</Label>
              <Input
                type="text"
                id="nonDisclosureAgreement"
                value={contractDetails.nonDisclosureAgreement ? "Yes" : "No"}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="nonCompeteClause">Non-Compete Clause</Label>
              <Input
                type="text"
                id="nonCompeteClause"
                value={contractDetails.nonCompeteClause ? "Yes" : "No"}
                readOnly
              />
            </FormGroup>
            {/* Add other fields for contract details */}
            <FormGroup>
              <Label for="governingLaw">Governing Law</Label>
              <Input
                type="text"
                id="governingLaw"
                value={contractDetails.governingLaw}
                readOnly
              />
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DoctorContracts;
