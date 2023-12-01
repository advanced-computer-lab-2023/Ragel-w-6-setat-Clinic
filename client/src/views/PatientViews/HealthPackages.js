import React, { useState, useRef } from "react";
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
  Input,
} from "reactstrap";

const HealthPackages = () => {
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

  const slideContent = [
    {
      title: "Package 1",
      text: "details of package",
    },
    {
      title: "package 2",
      text: "details of package",
    },
    {
      title: "package 3",
      text: "details of package",
    },
  ];

  return (
    <Container className="mt-5">
      <Row>
        {/* Carousel on the left */}
        <Col xs="6">
          <Container
            style={{ marginLeft: "20px", marginTop: "40px", width: "100%" }}
          >
            <Slider ref={sliderRef} {...settings}>
              {slideContent.map((slide, index) => (
                <div
                  key={index}
                  style={{ marginLeft: "20px", marginBottom: "20px" }}
                >
                  <div
                    style={{
                      backgroundColor: "#0C356A",
                      padding: "30px",
                      borderRadius: "8px",
                      color: "#ffffff",
                      width: "300px",
                      height: "300px",
                    }}
                  >
                    <h3 style={{ color: "#87CEEB" }}>{slide.title}</h3>
                    <p>{slide.text}</p>
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
        <Col xs="6">
          <Col
            xl="19"
            style={{ position: "relative", top: "20px", right: "10px" }}
          >
            <Container fluid style={{ marginBottom: "10px" }}>
              <Card className="bg-secondary shadow shadow w-100">
                <CardHeader
                  className="border-0"
                  style={{ backgroundColor: "#0C356A" }}
                >
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h6
                        className="heading-small text-muted mb-4"
                        style={{ fontSize: "24px", fontWeight: "bold" }}
                      >
                        Subscribe For Myself
                      </h6>
                    </Col>
                    {/* First additional button */}
                    <Col className="text-right" xs="4">
                      <Button color="secondary" href="#pablo" size="sm">
                        Pay using credit card
                      </Button>
                    </Col>
                    {/* Second additional button */}
                    <Col className="text-right" xs="4">
                      <Button color="secondary" href="#pablo" size="sm">
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
                  </Form>
                </CardBody>
              </Card>

              {/* Subscribe For A Family Member Section */}
              <Card className="bg-secondary shadow shadow w-100 mt-4">
                <CardHeader
                  className="border-0"
                  style={{ backgroundColor: "#0C356A" }}
                >
                  <Row className="align-items-center">
                    <Col xs="12">
                      <h6
                        className="heading-small text-muted mb-4"
                        style={{ fontSize: "24px", fontWeight: "bold" }}
                      >
                        Subscribe For A Family Member
                      </h6>
                    </Col>
                    {/* First additional button */}
                    <Col className="text-right" xs="4">
                      <Button color="secondary" href="#pablo" size="sm">
                        Pay using credit card
                      </Button>
                    </Col>
                    {/* Second additional button */}
                    <Col className="text-right" xs="4">
                      <Button color="secondary" href="#pablo" size="sm">
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
                      <Col lg="5">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            style={{ color: "#f7fafc" }}
                          >
                            Email (Must match the email your family member
                            registered with)
                          </label>
                          <Input
                            className="form-control-alternative"
                            type="email"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
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
