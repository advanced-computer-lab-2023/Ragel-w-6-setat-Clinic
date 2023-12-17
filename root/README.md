
HEALTH SPACE 

![App Screenshot](https://media.discordapp.net/attachments/1157430089181577291/1159866558227693578/acl_clinic_6.png?ex=658edde8&is=657c68e8&hm=0cc036be1a1d14a84bf64aed1a7287c39bd700488a84e6a29f3b483e6d61aebc&=&format=webp&quality=lossless&width=625&height=625)


A complete Online Learning System for the CSEN704 Course (Advanced Programming Lab) in GUC (German University in Cairo). An Online Health Clinic System as a web application where people can have a wider access to healthcare in addition to remote healthcare. By creating this Health Space clinic patients are able to log on and receive the best healthcare in a simple way.

## Motivation
The motivation behind this project stems from a deep commitment to enhancing healthcare accessibility. By creating a centralized platform, the goal is to make healthcare services readily available to a wider audience, ensuring patients can easily connect with pharmacists and access vital medical information.
with this project being a requirement for our ACL course in the GUC it was able to help us understand and implement the MERN Stack, and think critically about implementing a functioning website which nudges into our future career paths.
## Objectives
- Learn how to properly use the Agile Methodology to plan out a project and develop the software.

- Learn the process of following a given set of System Requirements to develop a software.

- Learn to research and master the use of the MERN Stack.
Learn how to work together as a team on GitHub.

- Work under Project Manager and do feedback sessions to make more imporvments.


## Tech Stack

 React, Bootstrap, MUI, javaScript
 Node, Express, MongoDB, postman


## Installation

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

1. Click on code -> Download ZIP

2. Extract the zip file and open it in visual studio code.

3.  Navigate to the server folder using the terminal and run the  following command:

 npm install

4. Next, navigate to the client folder in the terminal and run the following command:

 npm install
## Backend

clone the project git clonehttps://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/tree/main

go to root : cd root

go to server : cd server

to run the backend : nodemon app.js


## Frontend

clone the project git clonehttps://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/tree/main

go to root : cd root

go to client : cd client

to run the frontend : npm start

API References
1. Express.js(express)
Description: Web application framework for Node.js, used for building the backend server and handling HTTP requests.
Documentation: Express.js Documentation

2. Mongoose(mongoose)
Description: Elegant Object Data Modeling (ODM) library for MongoDB and Node.js, streamlining interaction with MongoDB.
Documentation: Mongoose Documentation

3. Axios(axios)
Description: Promise-based HTTP client for making HTTP requests, facilitating seamless communication with external APIs.
Documentation: Axios Documentation

4. Bcrypt(bcrypt)
Description: Library for hashing and salting passwords, fortifying the project's password security.
Documentation: Bcrypt Documentation

5. Cors(cors)
Description: Middleware for Express.js enabling Cross-Origin Resource Sharing (CORS), granting controlled access to server resources.
Documentation: Cors Documentation

6. Dotenv(dotenv)
Description: Zero-dependency module seamlessly loading environment variables from a .env file into process.env.
Documentation: Dotenv Documentation

7. Jsonwebtokens(jsonwebtoken)
Description: Robust library for creating and verifying JSON Web Tokens (JWT), a cornerstone for user authentication.
Documentation: Jsonwebtoken Documentation

8. Morgan(morgan)
Description: Express.js middleware providing an HTTP request logger, capturing essential information about incoming requests.
Documentation: Morgan Documentation

9. Multer(multer)
Description: Middleware tailored for handling multipart/form-data, an essential tool for efficient file uploads.
Documentation: Multer Documentation
10. Nodemailer(nodemailer)
Description: Powerful module for sending emails, often utilized for tasks like dispatching confirmation emails.
Documentation: Nodemailer Documentation

11. Nodemon(nodemon)
Description: Intelligent utility monitoring changes in source code and autonomously restarting the server.
Documentation: Nodemon Documentation

12. Socket.io(^4.7.2)
Description: Real-time bidirectional event-based communication library for Node.js. Facilitates real-time communication between web clients and servers.
Documentation: Socket.IO Documentation

13. Stripe(@stripe/stripe-js and stripe)
Description: Libraries dedicated to handling Stripe payments, a leading payment processing platform.
Documentation:
Stripe.js Documentation
Stripe Node.js Documentation

For detailed information and usage instructions, refer to the official documentation linked above for each API.
## Database Models :

Admin: The Admin model is the user holds all the general information and personal information regarding that model like the name email password(hashed) and whether they are active or not and whether email is verfied or not  

![App Screenshot](https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/blob/sara/Screenshot%202023-12-17%20021927.png)

Appointment: Holds all the appointment information and is helps us link both the patient and the doctor with each other in an effecient way 

![App Screenshot](https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/blob/sara/Screenshot%202023-12-17%20021954.png?raw=true)


DoctorContracts: Holds the doctor contract information which is overseen by the admin and determines the pricing point of the doctor

()

Doctor: 
![App Screenshot](https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/blob/sara/Screenshot%202023-12-17%20022056.png)


Notifications: holfs the notifications from doctor to patient and is sent through email 
![App Screenshot](https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/blob/sara/Screenshot%202023-12-17%20022142.png?raw=true)

Package: is a static schema holding the three available packages for the patient or family member to subscribe to and retreive offers based on their subscription 

![App Screenshot](https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/blob/sara/Screenshot%202023-12-17%20022157.png?raw=true)

Patient: holds all the patient details needed to be immediately retreived by the doctor and all the family members information and showcases if the family member is linked to the patients account or not which is very important as the family member benefits from discounts as well 

![App Screenshot](https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/blob/sara/Screenshot%202023-12-17%20022232.png?raw=true)

Prescription: holds the Prescription id and the doctor assigning the medication as well as the patient receiving said medication also very useful in a lot of frontend linking and passing of information.

![App Screenshot](https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/blob/sara/Screenshot%202023-12-17%20022304.png?raw=true)

PatientPharmacy: where the prescription order information is saved so that it can be accessed later on by the pharmacist as well as the patient being able to order their prescription
![App Screenshot](https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/blob/sara/Screenshot%202023-12-17%20022218.png?raw=true)



## Code Styles

- Prettier : it is a code formatter that runs automatically before each commit on the whole code so that the codes looks well formatted across the whole project

- This project follows a specific code style to ensure consistency and readability across the codebase. Adopting a consistent coding style is important for collaboration and maintenance.

- We adhere to the Standart Code Style Guide for this project. Please review the guide before contributing to ensure that your code aligns with our established conventions.

- Consistent Formatting: The code is formatted consistently with proper indentation, making it easier to read and understand.

- Descriptive Variable Names: Variable names like fromDateReschedule, followUpDate, linkedFamilyMembers, toggleAppointmentModal, etc., are descriptive and convey their purpose.

- Destructuring: Destructuring of props like user from UserContext is used to extract specific values, enhancing readability.

- Async/Await: The code uses async/await syntax for handling asynchronous operations, improving code readability and managing promises effectively.

- React Component Structure: The component is structured with functional components, utilizing React hooks such as useState and useEffect to manage state and side effects.

- Conditional Rendering: Conditional rendering is used for displaying modals (Modal isOpen={modalStates[index]}) and disabling/enabling buttons based on appointment status.

- Consistent Styling: Inline styling and class names are consistent throughout the component, making it easier to maintain and style elements.

- Error Handling: There are error handling blocks (try...catch) to handle potential errors that may occur during API requests (axios calls).

- Comments: Comments are added to explain certain blocks of code or functionality, enhancing code understanding for future reference.

- Event Handling: Event handling is consistent, such as onClick events on buttons invoking corresponding functions (handleReschedule, handleFollowUp, handleCancel).

## Build Status

The project in its current state is in the development stage, going through the milestones the implementation of the code and the execution of it vastly improved due to the learning curve.

Some of the learning curves that we experienced through milestone 2 to milestone 3 where (authentication) and (user login)

issues we faced with our code slowness in fetching the data from the backend to the frontend. 

although the frontend is very functional the organization is slightly crammed.

The project needs in the near future to be deployed through Google cloud or something similar to that.
## How to Use

- Admin : 
. you are able to remove/accept a patient/doctors account
. you are able to review all documentation provided by doctors and so on 


- Doctor : 
. After the process of registering onto a doctors account you are able to create available appointments for yourself which are later on made available to the patients and can then view to book an appointment.

. You can view a complete history of your appointment through filtering (upcoming,completed,cancelled)

. You are able to schedule follow-up appointments with patients and provide them with prescriptions that they can view on their account

. You are also able to cancel appointments with patients or have video-chat meetings or regular chat with patients as well


- Patient : 
. After registering for an account you are able to view and edit your details on your account such as :
1- adding medical history
2- adding/removing family members to/from your account
3- you are able to subscribe/unsubscribe to/from health packages
4- you are able to keep track of your prescriptions and order them off of the pharmacy. 
etc..


## Credits

Credits
1. @02omar
2. @Hauna9
3. @shahdamerr
4. @LujainTa
5. @habibahilal
6. @mariamelgendy
7. @sara2413
## License

[MIT](https://choosealicense.com/licenses/mit/)

