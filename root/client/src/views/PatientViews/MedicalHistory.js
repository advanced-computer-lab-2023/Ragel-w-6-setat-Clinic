import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
} from "reactstrap";

const MedicalHistory = () => {
  return (
    <>
      <Container className="mt-5">
        <Row xs="2">
          <Col className="pt-2 pb-2">
            <Container>
              <h4
                style={{
                  color: "#0C356A",
                }}
              >
                <i
                  className="fa-regular fa-folder-open fa-xl"
                  style={{
                    color: "#0C356A",
                  }}
                ></i>{" "}
                Records Uploaded by You
              </h4>
              <ListGroup flush>
                <ListGroupItem style={{ backgroundColor: "#f8f9fe" }}>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#0C356A", color: "#f8f9fe" }}
                  >
                    view
                  </Button>
                  <Button
                    className="ml-1 mr-5"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#0C356A", color: "#f8f9fe" }}
                  >
                    delete
                  </Button>
                  <i
                    class="fa-solid fa-file-pdf"
                    style={{ color: "#0C356A" }}
                  ></i>{" "}
                  Allergies
                </ListGroupItem>
                <ListGroupItem style={{ backgroundColor: "#f8f9fe" }}>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#0C356A", color: "#f8f9fe" }}
                  >
                    view
                  </Button>
                  <Button
                    className="ml-1 mr-5"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#0C356A", color: "#f8f9fe" }}
                  >
                    delete
                  </Button>
                  <i
                    class="fa-solid fa-file-image"
                    style={{ color: "#0C356A" }}
                  ></i>{" "}
                  Checkup
                </ListGroupItem>
                <ListGroupItem style={{ backgroundColor: "#f8f9fe" }}>
                  <Button
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#0C356A", color: "#f8f9fe" }}
                  >
                    view
                  </Button>
                  <Button
                    className="ml-1 mr-5"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#0C356A", color: "#f8f9fe" }}
                  >
                    delete
                  </Button>
                  <i
                    class="fa-solid fa-file-image"
                    style={{ color: "#0C356A" }}
                  ></i>{" "}
                  Lab Results
                </ListGroupItem>
              </ListGroup>
            </Container>
          </Col>
          <Col
            className=" border pt-2 pb-2"
            style={{ backgroundColor: "#0C356A" }}
          >
            <Container>
              <h4
                style={{
                  color: "#f8f9fe",
                }}
              >
                <i
                  className="fa-regular fa-folder-open fa-xl"
                  style={{
                    color: "#f8f9fe",
                  }}
                ></i>{" "}
                Records Uploaded by Doctors
              </h4>
              <ListGroup flush>
                <ListGroupItem
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#f8f9fe",
                  }}
                >
                  <Button
                    className="mr-5"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#f8f9fe", color: "#0C356A" }}
                  >
                    view
                  </Button>
                  <i
                    class="fa-solid fa-file-image"
                    style={{ color: "#f8f9fe" }}
                  ></i>{" "}
                  Lab Results
                </ListGroupItem>
                <ListGroupItem
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#f8f9fe",
                  }}
                >
                  {" "}
                  <Button
                    className="mr-5"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#f8f9fe", color: "#0C356A" }}
                  >
                    view
                  </Button>
                  <i
                    class="fa-solid fa-file-image"
                    style={{ color: "#f8f9fe" }}
                  ></i>{" "}
                  Checkup
                </ListGroupItem>
                <ListGroupItem
                  style={{
                    backgroundColor: "#0C356A",
                    color: "#f8f9fe",
                  }}
                >
                  <Button
                    className="mr-5"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                    style={{ backgroundColor: "#f8f9fe", color: "#0C356A" }}
                  >
                    view
                  </Button>
                  <i
                    class="fa-solid fa-file-pdf"
                    style={{ color: "#f8f9fe" }}
                  ></i>{" "}
                  History
                </ListGroupItem>
              </ListGroup>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MedicalHistory;
