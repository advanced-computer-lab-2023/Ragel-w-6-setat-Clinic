import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Alert,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const HealthPackages = () => {
  const { user } = useAuthContext();

  const [visible, setVisible] = useState(false);
  const onDismiss = () => setVisible(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertColor, setAlertColor] = useState("danger");

  const [visible2, setVisible2] = useState(false);
  const onDismiss2 = () => setVisible2(false);
  const [alertMessage2, setAlertMessage2] = useState("");
  const [alertColor2, setAlertColor2] = useState("danger");

  const [familyMembers, setFamilyMembers] = useState([]);
  const [memberEmail, setMemberEmail] = useState("");
  const [healthPackages, setHealthPackages] = useState([]);
  const [memberSubscribedPackages, setMemberSubscribedPackages] = useState("");

  useEffect(() => {
    const fetchFamilyMembers = async () => {
      try {
        const response = await fetch(
          `/patients/familyMembers/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          const familyMembersWithEmail = json.patientFamily.filter(
            (familyMember) => familyMember.email
          );
          setFamilyMembers(familyMembersWithEmail);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchFamilyMembers();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchHealthPackages = async () => {
      try {
        const response = await fetch(
          `/patients/allHealthPackages/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setHealthPackages(json);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };

    fetchHealthPackages();
  }, [user]);

  useEffect(() => {
    const fetchSubscribedPackageOfFamilyMember = async () => {
      try {
        const response = await fetch(
          `/patients/subscribedPackageOfFamilyMember/${user.user._id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const json = await response.json();
        if (response.ok) {
          setMemberSubscribedPackages(json.subscribedPackage);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };
    fetchSubscribedPackageOfFamilyMember();
    // eslint-disable-next-line
  }, []);

  const registeredFamilyMembers = familyMembers.map((member) => ({
    value: member.email,
    label: member.fName + " " + member.lName,
  }));

  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handlePrev = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
      sliderRef.current.slickGoTo(currentSlide - 1);
    }
  };

  const handleNext = () => {
    if (currentSlide < 2) {
      setCurrentSlide(currentSlide + 1);
      sliderRef.current.slickGoTo(currentSlide + 1);
    }
  };

  const slideContent = healthPackages.map((healthPackage) => ({
    title: healthPackage.name,
    text: healthPackage.description,
  }));

  const subscribeToPackageCreditCard = async () => {
    try {
      if (healthPackages.length === 0) return;
      const selectedPackage = healthPackages[currentSlide];
      const { name, price } = selectedPackage;
      let finalPrice = price;

      if (memberSubscribedPackages) {
        let subscriptionDiscount = 0;
        subscriptionDiscount =
          memberSubscribedPackages.subscriptionDiscount || 0;

        const originalSessionPrice = price;
        const discountedPrice =
          originalSessionPrice -
          originalSessionPrice * (subscriptionDiscount / 100);
        finalPrice = discountedPrice;
      }

      const items = [
        {
          name: name,
          price: finalPrice,
          quantity: 1,
          forAppointments: false,
        },
      ];

      const paymentData = {
        paymentType: "creditCard",
        item: items,
        paymentMethodId: "pm_card_visa",
        forAppointments: false,
      };
      await axios.patch(
        `/patients/subscribeHealthPackage/${user.user._id}/${selectedPackage._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const response = await axios.post(
        `/patients/processPayment/${user.user._id}`,
        {
          paymentData,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.data) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage(error.response.data.message);
        setAlertColor("danger");
        setVisible(true);
      }
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
    }
  };

  const subscribeToPackageWallet = async () => {
    try {
      if (healthPackages.length === 0) return;

      const selectedPackage = healthPackages[currentSlide];
      const { name, price } = selectedPackage;
      let finalPrice = price;

      if (memberSubscribedPackages) {
        let subscriptionDiscount = 0;
        subscriptionDiscount =
          memberSubscribedPackages.subscriptionDiscount || 0;

        const originalSessionPrice = price;
        const discountedPrice =
          originalSessionPrice -
          originalSessionPrice * (subscriptionDiscount / 100);
        finalPrice = discountedPrice;
      }

      const items = {
        name: name,
        price: finalPrice,
        quantity: 1,
        forAppointments: false,
      };

      const paymentData = {
        paymentType: "wallet",
        item: items,
        paymentMethodId: "pm_card_visa",
        forAppointments: false,
      };

      await axios.patch(
        `/patients/subscribeHealthPackage/${user.user._id}/${selectedPackage._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const response = await axios.post(
        `/patients/processPayment/${user.user._id}`,
        {
          paymentData,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.status === 200) {
        setAlertMessage(response.data.message);
        setAlertColor("success");
        setVisible(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage(error.response.data.message);
        setAlertColor("danger");
        setVisible(true);
      }
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
    }
  };

  const subscribeToFamilyMemberWallet = async (index) => {
    try {
      if (healthPackages.length === 0) return;

      const selectedPackage = healthPackages[currentSlide];
      const { name, price } = selectedPackage;

      const items = {
        name: name,
        price: price,
        quantity: 1,
        forAppointments: false,
      };

      const paymentData = {
        paymentType: "wallet",
        item: items,
        paymentMethodId: "pm_card_visa",
        familyMemberEmail: memberEmail,
        forAppointments: false,
      };

      await axios.post(
        `/patients/processPayment/${user.user._id}`,
        {
          paymentData,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      const response2 = await axios.patch(
        `/patients/subscribeHealthPackageForFamilyMember/${user.user._id}/${selectedPackage._id}`,
        {
          email: memberEmail,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response2.status === 200) {
        setAlertMessage2(response2.data.message);
        setAlertColor2("success");
        setVisible2(true);
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage2(error.response.data.message);
        setAlertColor2("danger");
        setVisible2(true);
      }
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
    }
  };

  const subscribeToFamilyMemberCreditCard = async (packageId, index) => {
    try {
      if (healthPackages.length === 0) return;

      const selectedPackage = healthPackages[currentSlide];
      const { name, price } = selectedPackage;

      const items = [
        {
          name: name,
          price: price,
          quantity: 1,
          forAppointments: false,
        },
      ];

      const paymentData = {
        paymentType: "creditCard",
        item: items,
        paymentMethodId: "pm_card_visa",
        familyMemberEmail: memberEmail,
        forAppointments: false,
      };

      const response = await axios.post(
        `/patients/processPayment/${user.user._id}`,
        {
          paymentData,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      await axios.patch(
        `/patients/subscribeHealthPackageForFamilyMember/${user.user._id}/${selectedPackage._id}`,
        {
          email: memberEmail,
        },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (response.data) {
        window.location.href = response.data.url;
      }
    } catch (error) {
      if (error.response.status === 400) {
        setAlertMessage2(error.response.data.message);
        setAlertColor2("danger");
        setVisible2(true);
      }
      console.error(
        "Error subscribing to the package:",
        error.response.data.message
      );
    }
  };

  return (
    <Container className="mt-5" fluid>
      <Row>
        {/* Carousel on the left */}
        <Col lg="6">
          <Container
            fluid
            style={{
              marginLeft: "20px",
              marginTop: "20px",
              width: "100%",
              height: "100%",
            }}
          >
            <Slider ref={sliderRef} {...settings}>
              {slideContent.map((slide, index) => (
                <div
                  key={index}
                  style={{
                    marginLeft: "20px",
                    marginBottom: "20px",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center", // Center horizontally
                    alignItems: "center", // Center vertically
                  }}
                >
                  <div
                    style={{
                      backgroundColor: "#0C356A",
                      padding: "30px",
                      borderRadius: "8px",
                      color: "#ffffff",
                      width: "400px",
                      height: "400px",
                      textAlign: "center", // Center content horizontally
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center", // Center content vertically
                    }}
                  >
                    <h3 style={{ color: "#f7fafc", fontSize: "20px" }}>
                      {slide.title}
                    </h3>
                    <p style={{ color: "#f7fafc", fontSize: "20px" }}>
                      {slide.text}
                    </p>
                  </div>
                </div>
              ))}
            </Slider>
            <div
              style={{
                textAlign: "left",
                marginTop: "40px",
                marginLeft: "15px",
              }}
            >
              <Button onClick={handlePrev}>Previous</Button>
              <span style={{ margin: "0 20px" }}>
                {currentSlide + 1} / {slideContent.length}
              </span>
              <Button onClick={handleNext}>Next</Button>
              {Array.from({ length: slideContent.length }).map((_, index) => (
                <span
                  key={index}
                  className={index === currentSlide ? "dot active" : "dot"}
                  onClick={() => sliderRef.current.slickGoTo(index)}
                ></span>
              ))}
            </div>
          </Container>
        </Col>

        {/* Family member container on the right */}
        <Col lg="6">
          <Col
            xl="19"
            style={{ position: "relative", top: "20px", right: "10px" }}
          >
            <Container fluid style={{ marginBottom: "10px" }}>
              <Card
                className="bg-secondary shadow shadow"
                style={{ width: "80%" }}
              >
                <CardHeader
                  className="border-0"
                  style={{ backgroundColor: "#0C356A" }}
                >
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h6
                        className="heading-small text-muted mb-4"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        Subscribe For Myself
                      </h6>
                    </Col>
                    {/* First additional button */}
                    <Col className="text-right" xs="4">
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={subscribeToPackageCreditCard}
                      >
                        Pay using credit card
                      </Button>
                    </Col>
                    {/* Second additional button */}
                    <Col className="text-right" xs="4">
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={subscribeToPackageWallet}
                      >
                        Pay using your wallet
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#0C356A" }}>
                  <Form>
                    <hr
                      className="my-4"
                      style={{ backgroundColor: "#f7fafc" }}
                    />
                    <Alert
                      className="mt-3"
                      color={alertColor}
                      isOpen={visible}
                      toggle={onDismiss}
                    >
                      {alertMessage}
                    </Alert>
                  </Form>
                </CardBody>
              </Card>

              {/* Subscribe For A Family Member Section */}
              <Card
                className="bg-secondary shadow mt-4 mb-5"
                style={{ width: "80%" }}
              >
                <CardHeader
                  className="border-0"
                  style={{ backgroundColor: "#0C356A" }}
                >
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h6
                        className="heading-small text-muted mb-4"
                        style={{ fontSize: "15px", fontWeight: "bold" }}
                      >
                        Subscribe For A Family Member
                      </h6>
                    </Col>
                    {/* First additional button */}
                    <Col className="text-right" xs="4">
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={subscribeToFamilyMemberCreditCard}
                      >
                        Pay using credit card
                      </Button>
                    </Col>
                    {/* Second additional button */}
                    <Col className="text-right" xs="4">
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={subscribeToFamilyMemberWallet}
                      >
                        Pay using your wallet
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody style={{ backgroundColor: "#0C356A" }}>
                  <Form>
                    <hr
                      className="my-4"
                      style={{ backgroundColor: "#f7fafc" }}
                    />
                    {/* Replace the text with another "Add Family Member" button */}
                    <Row>
                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            Email{" "}
                            <div
                              className="h5 font-weight-300"
                              style={{ color: "#f7fafc" }}
                            ></div>
                          </label>
                          <Select
                            options={registeredFamilyMembers}
                            isSearchable={true}
                            placeholder="Select a family member"
                            value={memberEmail}
                            onChange={(selectedOption) =>
                              setMemberEmail(selectedOption)
                            }
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                  <Alert
                    className="mt-3"
                    color={alertColor2}
                    isOpen={visible2}
                    toggle={onDismiss2}
                  >
                    {alertMessage2}
                  </Alert>
                </CardBody>
              </Card>
            </Container>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default HealthPackages;
