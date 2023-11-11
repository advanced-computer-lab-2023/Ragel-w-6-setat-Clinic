/*!

=========================================================
* Argon Dashboard React - v1.2.3
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import AdminHeader from "components/Headers/AdminHeader.js";
import { useEffect, useState } from "react";



const HandlePharmReq = () => {

  

  const [pharmacistRequests, setPharmacistRequests] = useState(null)
  useEffect(() => { 
    const fetchPharmacistRequests = async () => {
      const response = await fetch('/api/admin/getPharmacistsRequestsInfo')
      const json = await response.json() //array of objects where each represents an admin
      console.log(json)
      if (response.ok) {
        setPharmacistRequests(json)
      }
    }

    fetchPharmacistRequests()

    fetch('/api/admin/getPharmacistsRequestsInfo')
  .then((response) => response.json())
  .then((data) => console.log('Received API response:', data))
  .catch((error) => console.error('API request error:', error));
  }, [])

   const[name, setName] = useState('')
   const[username, setUsername] = useState('')
   const[password, setPassword] = useState('')
   const[email, setEmail] = useState('')
   const[dateOfBirth, setDateOfBirth] = useState('')
   const[hourlyRate, setHourlyRate] = useState('')
   const[affiliation, setAffiliation] = useState('')
   const[educationalBackground, setEducationalBackground] = useState('')
          
             const [acceptFeedback, setAcceptFeedback] = useState('');
          // Function to approve a pharmacist request
             const handleApprove =  (request) => {
             setAcceptFeedback(request.name + " is being created...");
             /*console.log(request + " trying to print the fucking request ffs"); */
             console.log('Request Data:', request);
             const name= request.name;
             const username= request.username;
             const password = request.password;
             const email = request.email;
             const dateOfBirth = request.dateOfBirth;
             const hourlyRate = request.hourlyRate;
             const affiliation = request.affiliation;
             const educationalBackground = request.educationalBackground;

             const newPharmacist = {
              name,username,password,email,dateOfBirth,hourlyRate,affiliation,educationalBackground
              }


           
                // Call the API to create a new pharmacist
                fetch(`api/admin/createPharmacist`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(newPharmacist),
                }).then((response) => {
                  if (response.ok) {
                    // Handle success (e.g., update the UI)
                    setAcceptFeedback(`Pharmacist request with ID ${request.name} has been rejected.`);
                  } else {
                    // Handle errors
                    setAcceptFeedback(`Error accepting pharmacist request with ID ${response.name}`);
                  }
                })
                .catch((error) => {
                  console.error('API request error:', error);
                  setAcceptFeedback('API request error');
                });
            };


                
              
           
      
        //TODO render page and remove from the UI the element in the table

           // handleReject(request._id) //deletes pharmacist req from table
          
          const [rejectFeedback, setRejectFeedback] = useState(''); // State for feedback message
          // Function to reject a pharmacist request
          const handleReject = (id) => {
            // Update the feedback message to indicate the action is in progress
            setRejectFeedback('Rejecting...');
        
            fetch(`/api/admin/rejectPharmacistRequest/${id}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ status: 'true' }),
            })
              .then((response) => {
                if (response.ok) {
                  // Handle success (e.g., update the UI)
                  setRejectFeedback(`Pharmacist request with ID ${id} has been rejected.`);
                } else {
                  // Handle errors
                  setRejectFeedback(`Error rejecting pharmacist request with ID ${id}`);
                }
              })
              .catch((error) => {
                console.error('API request error:', error);
                setRejectFeedback('API request error');
              });
          };
        
        
           
        

  return (
    <>
      <AdminHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0">Handle Pharmacist Requests</h3>
              </CardHeader>
               <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">Hourly Rate</th>
                    <th scope="col">Affiliation</th>
                    <th scope="col">Educational Background</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    {/* Add other table headers here */}
                  </tr>
                </thead>
                {pharmacistRequests !== null ? (
            <tbody>
                {pharmacistRequests.map((request, index) => (
                  <tr key={index}>
                    <td>{request.name}</td>
                    <td>{request.email}</td>
                    <td>{request.dateOfBirth}</td>
                    <td>{request.hourlyRate}</td>
                    <td>{request.affiliation}</td>
                    <td>{request.educationalBackground}</td>
                    <td>{request.status ? "Handled" : "Not Handled"}</td>
                    <td>
                    <Button
                color="info"
                href="#pablo"
                onClick={() => handleApprove(request)}>Approve</Button> //TODO add accept feedback
                   <Button
                color="info"
                href="#pablo"
                onClick={() => handleReject(request._id)}>Reject</Button>
                  </td> 
                  <td>{request.name}</td>
                  <td>{acceptFeedback}</td> {/* Add the acceptFeedback message here */}
                  <td>{rejectFeedback}</td> {/* Add the rejectFeedback message here */} 
                  
                  </tr>
                ))}
              </tbody>
            ) : (
              <tbody>
                <tr>
                  <td colSpan="7">Loading data...</td>
                </tr>
              </tbody>
            )}

                </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
          </div>
        </Row>
       
      </Container>
    </>
  );
};

export default HandlePharmReq;
