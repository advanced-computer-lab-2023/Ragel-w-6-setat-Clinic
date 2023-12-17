# HEALTH SPACE

![App Screenshot](https://media.discordapp.net/attachments/1157430089181577291/1159866558227693578/acl_clinic_6.png?ex=658edde8&is=657c68e8&hm=0cc036be1a1d14a84bf64aed1a7287c39bd700488a84e6a29f3b483e6d61aebc&=&format=webp&quality=lossless&width=625&height=625)

Health Space is an Online Health Clinic System, designed as a web application, providing wider access to healthcare and remote healthcare services. This platform serves as a complete online learning system for the CSEN704 Course (Advanced Programming Lab) at GUC (German University in Cairo). Patients can easily log in and access quality healthcare services in a convenient manner.

## Motivation

The motivation behind this project is rooted in a strong commitment to improving healthcare accessibility. This platform aims to provide a centralized hub for accessing healthcare services, enabling easy connections between patients and pharmacists while facilitating access to crucial medical information.

As a requirement for our ACL course at GUC, this project allowed us to delve into and implement the MERN Stack. It provided a valuable opportunity to critically think about and execute a fully functional website, offering insights into our future career paths.
## Objectives

- **Agile Methodology:** Utilize Agile methodology effectively for project planning and software development.

- **System Requirements:** Demonstrate proficiency in implementing a given set of system requirements to develop software.

- **MERN Stack Mastery:** Research and master the use of the MERN Stack, understanding its intricacies and functionalities.

- **Collaboration via GitHub:** Develop teamwork skills by collaborating on GitHub, ensuring effective version control and collaborative development.

- **Project Management & Feedback:** Engage with project management practices and feedback sessions to iteratively improve the project.
## Tech/Framework used
- MERN Stack (MongoDB, Express.js, React.js, Node.js)
- JavaScript
- Postman
## Installation
These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.
1. Click on `code` -> `Download ZIP`
2. Extract the zip file and open it in visual studio code.
3. Navigate to the `server` folder using the terminal and run the following command:

        npm install
4. Next, navigate to the `client` folder in the terminal and run the following command:
        
        npm install
## Backend

### Clone the Project

Clone the project repository:


git clone https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/tree/main

*cd root*
*cd server*



to run the backend : nodemon app.js


## Frontend

### Clone the Project

Clone the project repository:

bash
git clone https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/tree/main

cd root
cd client

to run the backend : npm start
### How To Use
To launch the project locally, follow these steps:

Navigate to the `server` folder using the terminal and run the following command:

        npm start

Next, navigate to the `client` folder in the terminal and run the following command:

        npm start## API References
**1. Express.js(`express`)**
* **Description:** Web application framework for Node.js, used for building the backend server and handling HTTP requests.
* **Documentation:** [Express.js Documentation](https://expressjs.com/)

**2. Mongoose(`mongoose`)**
* **Description:** Elegant Object Data Modeling (ODM) library for MongoDB and Node.js, streamlining interaction with MongoDB.
* **Documentation:** [Mongoose Documentation](https://mongoosejs.com/)

**3. Axios(`axios`)**
* **Description:** Promise-based HTTP client for making HTTP requests, facilitating seamless communication with external APIs.
* **Documentation:** [Axios Documentation](https://axios-http.com/)

**4. Bcrypt(`bcrypt`)**
* **Description:** Library for hashing and salting passwords, fortifying the project's password security.
* **Documentation:** [Bcrypt Documentation](https://www.npmjs.com/package/bcrypt)

## Dependencies

### 5. Cors (`cors`)
- **Description:** Middleware for Express.js enabling Cross-Origin Resource Sharing (CORS), granting controlled access to server resources.
- **Documentation:** [Cors Documentation](https://www.npmjs.com/package/cors/)

### 6. Dotenv (`dotenv`)
- **Description:** Zero-dependency module seamlessly loading environment variables from a `.env` file into `process.env`.
- **Documentation:** [Dotenv Documentation](https://www.npmjs.com/package/dotenv)

### 7. Jsonwebtokens (`jsonwebtoken`)
- **Description:** Robust library for creating and verifying JSON Web Tokens (JWT), a cornerstone for user authentication.
- **Documentation:** [Jsonwebtoken Documentation](https://www.npmjs.com/package/jsonwebtoken)

### 8. Morgan (`morgan`)
- **Description:** Express.js middleware providing an HTTP request logger, capturing essential information about incoming requests.
- **Documentation:** [Morgan Documentation](https://www.npmjs.com/package/morgan)

### 9. Multer (`multer`)
- **Description:** Middleware tailored for handling multipart/form-data, an essential tool for efficient file uploads.
- **Documentation:** [Multer Documentation](https://www.npmjs.com/package/multer)

### 10. Nodemailer (`nodemailer`)
- **Description:** Powerful module for sending emails, often utilized for tasks like dispatching confirmation emails.
- **Documentation:** [Nodemailer Documentation](https://nodemailer.com/about/)

### 11. Nodemon (`nodemon`)
- **Description:** Intelligent utility monitoring changes in source code and autonomously restarting the server.
- **Documentation:** [Nodemon Documentation](https://nodemon.io/)

### 12. Socket.io (`^4.7.2`)
- **Description:** Real-time bidirectional event-based communication library for Node.js. Facilitates real-time communication between web clients and servers.
- **Documentation:** [Socket.IO Documentation](https://socket.io/docs/v4/)

### 13. Stripe (`@stripe/stripe-js` and `stripe`)
- **Description:** Libraries dedicated to handling Stripe payments, a leading payment processing platform.
- **Documentation:** 
  - [Stripe.js Documentation](https://stripe.com/docs/payments/elements)
  - [Stripe Node.js Documentation](https://stripe.com/docs/payments/elements)

For detailed information and usage instructions, refer to the official documentation linked above for each API.

## Code Styles

- **Prettier**: Automatic code formatter that ensures uniform formatting across the entire project before each commit.
- **Consistent Coding Style**: Maintains a specific code style for readability and consistency, essential for collaboration and maintenance.
- **Standart Code Style Guide**: Adherence to the Standart Code Style Guide ensures uniformity across the codebase. Contributors are encouraged to review the guide for code alignment.
- **Consistent Formatting**: Proper indentation and consistent formatting enhance code readability and comprehension.
- **Descriptive Variable Names**: Variables like `fromDateReschedule`, `followUpDate`, `linkedFamilyMembers`, `toggleAppointmentModal`, etc., use descriptive names to convey their purpose.
- **Destructuring**: Utilization of destructuring for props like `user` from `UserContext` enhances code readability.
- **Async/Await**: The use of async/await syntax for handling asynchronous operations improves code readability and manages promises effectively.
- **React Component Structure**: Functional components with React hooks (`useState`, `useEffect`) manage state and side effects efficiently.
- **Conditional Rendering**: Modals (`Modal isOpen={modalStates[index]}`) and button disabling/enabling based on appointment status use conditional rendering.
- **Consistent Styling**: Consistency in inline styling and class names throughout the component simplifies maintenance and styling.
- **Error Handling**: Error handling blocks (`try...catch`) manage potential errors during API requests (axios calls).
- **Comments**: Code includes comments to explain certain blocks or functionalities, aiding future reference and understanding.
- **Event Handling**: Consistent event handling, such as `onClick` events on buttons invoking corresponding functions (`handleReschedule`, `handleFollowUp`, `handleCancel`).

## Build Status

The project is currently in the development stage, progressing through milestones with continuous improvements in code implementation and execution. Notable learning curves were experienced during milestones 2 and 3, particularly in the areas of authentication and user login.

### Challenges Faced

One prominent issue encountered was the slowness in fetching data from the backend to the frontend. Despite this challenge, the frontend functionality remains robust, albeit with some organizational improvements needed.

### Future Considerations

Looking ahead, the project will require deployment, likely through platforms such as Google Cloud or similar services, to ensure accessibility and scalability in the near future.

## Contribute

We welcome contributions from the community! If you'd like to contribute to the development of this project, follow these guidelines:

1. **Fork the Repository**: Click on the "Fork" button on the top right corner of this repository's page.
2. **Clone the Repository**: Clone the forked repository to your local machine using the following terminal command:

        git clone https://github.com/your-username/your-forked-repo.git

3. **Create a Branch:** Create a new branch for your contributions:

        git checkout -b feature/your-feature-name

4. **Make Changes:** Make your desired changes to the codebase.
5. **Commit Changes:** Commit your changes with a meaningful commit message:

        git commit -m "Add your meaningful commit message here"

6. **Push Changes:** Push your changes to your forked repository:

        git push origin feature/your-feature-name

7. **Create a Pull Request (PR):** Open a Pull Request against the main branch of the original repository. Provide a clear title and description for your changes.

8. **Code Review:** Participate in the code review process. Make any requested changes if needed.

9. **Merge:** Once your changes are approved, they will be merged into the main branch.

Thank you for contributing to our project! 🚀

## Credits

- [@02omar](https://github.com/02omar)
- [@Hauna9](https://github.com/Hauna9)
- [@shahdamerr](https://github.com/shahdamerr)
- [@LujainTa](https://github.com/LujainTa)
- [@habibahilal](https://github.com/habibahilal)
- [@mariamelgendy](https://github.com/mariamelgendy)
- [@sara2413](https://github.com/sara2413)

- [YouTube Tutorial 1](https://www.youtube.com/watch?v=ENakkm58Uyw&t=354s): Valuable source for online guidance and assistance.
- [YouTube Tutorial 2](https://m.youtube.com/playlist?list=PLillGF-RfqbbQeVSccR9PGKHzPJSWqcsm)
- [YouTube Tutorial 3](https://www.youtube.com/watch?v=yXEesONd_54&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=7)
