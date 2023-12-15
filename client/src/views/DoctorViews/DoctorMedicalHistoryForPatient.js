import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useParams } from "react-router-dom";

import {
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Button,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

import { useAuthContext } from "../../hooks/useAuthContext";

const MedicalHistory = () => {
  const { patientid } = useParams();
  const { user } = useAuthContext();

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [acceptedFiles, setAcceptedFiles] = useState([]);

  // pagination patient
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 4;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const patientMedicalHistory = medicalHistory.filter(
    (record) => record.uploadByType === "Patient"
  );
  const records = patientMedicalHistory.slice(firstIndex, lastIndex);
  const npage = Math.ceil(patientMedicalHistory.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

  // pagination doctor
  const [currentPageDoctor, setCurrentPageDoctor] = useState(1);
  const recordsPerPageDoctor = 4;
  const lastIndexDoctor = currentPageDoctor * recordsPerPageDoctor;
  const firstIndexDoctor = lastIndexDoctor - recordsPerPageDoctor;
  const doctorMedicalHistory = medicalHistory.filter(
    (record) => record.uploadByType === "Doctor"
  );
  const recordsDoctor = doctorMedicalHistory.slice(
    firstIndexDoctor,
    lastIndexDoctor
  );
  const npageDoctor = Math.ceil(
    doctorMedicalHistory.length / recordsPerPageDoctor
  );
  const numbersDoctor = [...Array(npageDoctor + 1).keys()].slice(1);

  useEffect(() => {
    const fetchMedicalHistory = async () => {
      try {
        const response = await fetch(
          `/doctors/patientMedicalHistory/${user.user._id}/${patientid}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setMedicalHistory(data.medicalHistory);
        } else {
          throw new Error(data.message);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
    };

    fetchMedicalHistory();

    // eslint-disable-next-line
  }, []);

  const showDocument = async (path) => {
    window.open(`http://localhost:4000/uploads/` + path);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (acceptedFiles) {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      try {
        const response = await axios.post(
          `/doctors/uploadDocumentForPatient/${user.user._id}/${patientid}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        if (response.status === 200) {
          setMedicalHistory(response.data.medicalHistory);
        }
      } catch (error) {
        console.error("An error occurred:", error.response.data.message);
      }
      setAcceptedFiles([]);
    }
  };

  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
    console.log("Accepted Files:", acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1,
  });

  // pagination functions patient

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }

  function changeCurrentPage(id) {
    setCurrentPage(id);
  }

  // pagination functions doctor

  function prevPageDoctor() {
    if (currentPageDoctor !== 1) {
      setCurrentPageDoctor(currentPageDoctor - 1);
    }
  }

  function nextPageDoctor() {
    if (currentPageDoctor !== npageDoctor) {
      setCurrentPageDoctor(currentPageDoctor + 1);
    }
  }

  function changeCurrentPageDoctor(id) {
    setCurrentPageDoctor(id);
  }

  return (
    <>
      {/* Display uploaded files and trigger upload on button click */}
      <Container className="mt-5">
        <div {...getRootProps()} style={dropzoneStyles}>
          <input {...getInputProps()} />
          <p style={dropzoneTextStyles}>Select one file to drag/upload</p>
        </div>
        {acceptedFiles.length > 0 && (
          <div className="mb-5 mt-4 text-center">
            <h4>Selected File:</h4>
            <ul style={{ listStyle: "none" }}>
              {acceptedFiles.map((file) => (
                <li key={file.name}>{file.name}</li>
              ))}
            </ul>
            <Button
              onClick={handleUpload}
              type="submit"
              style={{ backgroundColor: "#0C356A", color: "#f8f9fe" }}
            >
              Upload
            </Button>
          </div>
        )}
      </Container>
      <Container className="mt-5">
        <Row style={{ alignItems: "start" }}>
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
                Records Uploaded by Patient
              </h4>

              <ListGroup flush>
                {records.length > 0
                  ? records.map(
                      (record, index) =>
                        record.uploadByType === "Patient" && (
                          <ListGroupItem
                            key={record._id}
                            style={{ backgroundColor: "#f8f9fe" }}
                          >
                            <Button
                              onClick={() => showDocument(record.filePath)}
                              size="sm"
                              style={{
                                backgroundColor: "#0C356A",
                                color: "#f8f9fe",
                              }}
                            >
                              view
                            </Button>
                            {record.fileType === "application/pdf" ? (
                              <i
                                className="fa-solid fa-file-pdf"
                                style={{ color: "#0C356A" }}
                              ></i>
                            ) : (
                              <i
                                className="fa-solid fa-file-image"
                                style={{ color: "#0C356A" }}
                              ></i>
                            )}{" "}
                            {record.name}
                          </ListGroupItem>
                        )
                    )
                  : ""}
              </ListGroup>
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-center mt-2"
                  listClassName="justify-content-center"
                >
                  <PaginationItem>
                    <PaginationLink href="#" onClick={prevPage}>
                      <i className="fa fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {numbers.map((n, i) => (
                    <PaginationItem
                      key={i}
                      className={`${currentPage === n ? "active" : ""}`}
                    >
                      <PaginationLink
                        style={{
                          backgroundColor: currentPage === n ? "#0C356A" : "", // Apply custom color when active
                          color: currentPage === n ? "#ffffff" : "", // Text color when active
                        }}
                        href="#"
                        onClick={() => changeCurrentPage(n)}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationLink href="#" onClick={nextPage}>
                      <i className="fa fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
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
                {recordsDoctor.length > 0
                  ? recordsDoctor.map(
                      (record, index) =>
                        record.uploadByType === "Doctor" && (
                          <ListGroupItem
                            key={record._id}
                            style={{
                              backgroundColor: "#0C356A",
                              color: "#f8f9fe",
                            }}
                          >
                            <Button
                              className="mr-5"
                              onClick={() => showDocument(record.filePath)}
                              size="sm"
                              style={{
                                backgroundColor: "#f8f9fe",
                                color: "#0C356A",
                              }}
                            >
                              view
                            </Button>
                            {record.fileType === "application/pdf" ? (
                              <i
                                className="fa-solid fa-file-pdf"
                                style={{ color: "#f8f9fe" }}
                              ></i>
                            ) : (
                              <i
                                className="fa-solid fa-file-image"
                                style={{ color: "#f8f9fe" }}
                              ></i>
                            )}{" "}
                            {record.name}
                          </ListGroupItem>
                        )
                    )
                  : ""}
              </ListGroup>
              <nav aria-label="...">
                <Pagination
                  className="pagination justify-content-center mt-2"
                  listClassName="justify-content-center"
                >
                  <PaginationItem>
                    <PaginationLink href="#" onClick={prevPageDoctor}>
                      <i className="fa fa-angle-left" />
                      <span className="sr-only">Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {numbersDoctor.map((n, i) => (
                    <PaginationItem
                      key={i}
                      className={`${currentPageDoctor === n ? "active" : ""}`}
                    >
                      <PaginationLink
                        style={{
                          backgroundColor:
                            currentPageDoctor === n ? "#0C356A" : "", // Apply custom color when active
                          color: currentPageDoctor === n ? "#ffffff" : "", // Text color when active
                        }}
                        href="#"
                        onClick={() => changeCurrentPageDoctor(n)}
                      >
                        {n}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationLink href="#" onClick={nextPageDoctor}>
                      <i className="fa fa-angle-right" />
                      <span className="sr-only">Next</span>
                    </PaginationLink>
                  </PaginationItem>
                </Pagination>
              </nav>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

// Styles for the drag and drop component
const dropzoneStyles = {
  border: "2px dashed #0C356A",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
  marginTop: "20px",
};

const dropzoneTextStyles = {
  color: "#0C356A",
};

export default MedicalHistory;
