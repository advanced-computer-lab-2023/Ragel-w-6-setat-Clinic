
# Health Space (Virtual Clinic)
![App Screenshot](https://media.discordapp.net/attachments/1157430089181577291/1159866558227693578/acl_clinic_6.png?ex=658edde8&is=657c68e8&hm=0cc036be1a1d14a84bf64aed1a7287c39bd700488a84e6a29f3b483e6d61aebc&=&format=webp&quality=lossless&width=625&height=625)

A complete Online Learning System for the CSEN704 Course (Advanced Programming Lab) in GUC (German University in Cairo). An Online Health Clinic System as a web application through which clinical services are exchanged.

## Motivation
The motivation behind this project stems from a deep commitment to enhancing healthcare accessibility. By creating a centralized platform, the goal is to make healthcare services readily available to a wider audience, ensuring patients can easily connect with pharmacists and access vital medical information.
with this project being a requirement for our ACL course in the GUC it was able to help us understand and implement the MERN Stack, and think critically about implementing a functioning website which nudges into our future career paths.

## Objectives
- Learn how to properly use the Agile Methodology to plan out a project and develop the software.
- Learn the process of following a given set of system requirements to develop a software.
- Learn to research and master the use of the MERN Stack.
- Learn how to work together as a team on GitHub.
- Work under project manager and do feedback sessions to make more improvements.
  
## Tech/Framework used
- MERN Stack (MongoDB, Express.js, React.js, Node.js)
- JavaScript

## Backend

clone the project git clone https://github.com/advanced-computer-lab-2023/Ragel-w-6-setat-Clinic/tree/main

go to root : cd root

go to server : cd server

to run the backend : nodemon app.js


## Database Models :

Admin: The Admin model is the user holds all the general information and personal information regarding that model like the name email password(hashed) and whether they are active or not and whether email is verfied or not  

{"_id":{"$oid":"657dfb3b121ad4a90829e841"},"username":"john_doe","password":"B8WIB6TR","email":"john.doe@example.com"}

Appointment: Holds all the appointment information and is helps us link both the patient and the doctor with each other in an effecient way 
{"_id":{"$oid":"657dfb2262324f4a68c2873b"},"patient":{"$oid":"65671310baf3f1f1336f63ff"},"doctor":{"$oid":"6525f12c2508c41d493c9876"},"date":{"$date":{"$numberLong":"1702504800000"}},"isAvailable":false,"type":"follow-up","status":"cancelled","price":{"$numberInt":"34"},"__v":{"$numberInt":"0"},"acceptance":"accepted"}

CreditCard:

DoctorContracts: Holds the doctor contract information which is overseen by the admin and determines the pricing point of the doctor
{"_id":{"$oid":"657dfb6e121ad4a90829e842"},"doctorId":"6525f12c2508c41d493c9876","startDate":"2023-01-07T14:00:00.000Z","endDate":"2028-01-07T14:00:00.000Z","markup":{"$numberInt":"10"},"isApproved":true,"termsAndConditions":"Standard terms and conditions apply.","noticePeriod":"30 days","benefits":"Healthcare, Dental, Retirement plan","workingHours":"40 hours per week","overtimePolicy":"Overtime is compensated at 1.5x hourly rate.","leavePolicy":"15 paid vacation days per year","renewalTerms":"Contract can be renewed for additional 2 years.","terminationClause":"Either party can terminate the contract with a 60-day notice.","nonDisclosureAgreement":true,"nonCompeteClause":false,"governingLaw":"State of California"}

Doctor: holds all the doctor details which is also overseen and approved by the admin 
{"_id":{"$oid":"657dfbed121ad4a90829e843"},"username":"Mohamed","password":"N2IGIHQY","email":"lojaintarek123@gmail.com","fName":"John","lName":"Smith","dateOfBirth":"1970-01-15","educationalBackground":"kwayes","hourlyRate":{"$numberInt":"100"},"affiliation":"General Hospital","specialty":"Cardiology","isRegistered":true,"sessionPrice":{"$numberInt":"150"},"wallet":{"$numberInt":"430"},"medicalCertificate":"https://img.freepik.com/premium-vector/medical-certificate-design-template-vaccine-certificate-free-covid-template-design_91611-585.jpg","__v":{"$numberInt":"3"},"documentID":"file_1699976524595.pdf","medicalDegree":"file_1699976524595.pdf","medicalLicense":"file_1699976524595.pdf"}

DoctorRequest:


Notifications: holfs the notifications from doctor to patient and is sent through email 
{"_id":{"$oid":"657dfc2962324f4a68c2873c"},"patient":{"$oid":"65671310baf3f1f1336f63ff"},"title":"Appointment Reminder","message":"Your upcoming doctor's appointment is scheduled for tomorrow at 10:00 AM.","date":"2023-11-28T10:00:00Z","read":false,"doctor":{"$oid":"6525f12c2508c41d493c9876"}}

Package: is a static schema holding the three available packages for the patient or family member to subscribe to and retreive offers based on their subscription 
{"_id":{"$oid":"657dfc3b62324f4a68c2873d"},"name":"Silver","price":{"$numberInt":"3600"},"description":"patient pays 3600 LE per year and gets 40% off any doctor's session price and 20% off any medicin ordered from pharmacy platform and 10% discount on the subscribtion of any of his family members in any package","sessionDiscount":{"$numberInt":"40"},"medicineDiscount":{"$numberInt":"20"},"subscriptionDiscount":{"$numberInt":"10"},"__v":{"$numberInt":"0"}}

Patient: holds all the patient details needed to be immediately retreived by the doctor and all the family members information and showcases if the family member is linked to the patients account or not which is very important as the family member benefits from discounts as well 
{"_id":{"$oid":"657dfc4e62324f4a68c2873e"},"username":"sarahe","password":"M145Y2JN","email":"lojaintarek222@gmail.com","fName":"soso","lName":"elshemy","nationalID":"1234456789","dateOfBirth":"1990-05-15","gender":"male","phoneNum":"12443-456-7890","emergencyContact":{"phoneNum":"987-654-324410","fName":"laloe","lName":"gmmDoe"},"familyMembers":[{"email":"sosos@emaplekjbkjb","fName":"Aelice","lName":"Drroe","nationalID":"98765774321","gender":"female","dateOfBirth":"1995-02-20","relationship":"sister","linked":false},{"email":"mariomat@boomoo","fName":"Mari","lName":"Geno","nationalID":"357753","gender":"female","dateOfBirth":"1995-02-20","relationship":"brother","linked":true},{"email":"mariomat@boomoo","fName":"mari","lName":"geno","nationalID":"123456789","gender":"male","dateOfBirth":{"$date":{"$numberLong":"631152000000"}},"relationship":"parent","_id":{"$oid":"657b629d704f046d3e985036"}}],"medicalHistory":["Allergies: Pollen","Previous surgeries: None"],"wallet":{"$numberDouble":"940.5"},"subscribedPackage":{"packageId":"609c8ac05e580a0014b6b55d","packageName":"Gold Plan","subscriptionStatus":"subscribed","renewalDate":"2023-12-01","cancellationDate":null,"_id":{"$oid":"656cfb3ff5fe7d4480cad061"}},"__v":{"$numberInt":"2"}}

Prescription: holds the Prescription id and the doctor assigning the medication as well as the patient receiving said medication also very useful in a lot of frontend linking and passing of information.
{"_id":{"$oid":"657dfc5f62324f4a68c2873f"},"patient":{"$oid":"65671310baf3f1f1336f63ff"},"doctor":{"$oid":"6574d1c989b795ecb9246f72"},"medication":[{"name":"Medicine1","dosage":"1 tablet","price":{"$numberDouble":"10.5"}},{"name":"Medicine2","dosage":"2 tablets","price":{"$numberDouble":"15.75"}}],"isFilled":false,"date":{"$date":{"$numberLong":"1677672000000"}},"notes":"Take medications with meals."}




## Code Styles

- Prettier : it is a code formatter that runs automatically before each commit on the whole code so that the codes looks well formatted across the whole project

- This project follows a specific code style to ensure consistency and readability across the codebase. Adopting a consistent coding style is important for collaboration and maintenance.

We adhere to the Standart Code Style Guide for this project. Please review the guide before contributing to ensure that your code aligns with our established conventions.


## Build Status

The project in its current state is in the development stage, going through the milestones the implement of the code and the execution of it vastly improved due to the learning curve.

Some of the learning curves that we experienced through milestone 2 to milestone 3 where (authentication) and (user login)

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


## Installation

These instructions will help you get a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

1- Click on `code` -> `Download ZIP`

2- Extract the zip file and open it in visual studio code.

3- Navigate to the `server` folder using the terminal and run the following command:

     npm install
 
4- Next, navigate to the `client` folder in the terminal and run the following command:

     npm install

## Credits
- [@02omar](https://github.com/02omar)
- [@Hauna9](https://github.com/Hauna9)
- [@shahdamerr](https://github.com/shahdamerr)
- [@LujainTa](https://github.com/LujainTa)
- [@habibahilal](https://github.com/habibahilal)
- [@mariamelgendy](https://github.com/mariamelgendy)
- [@sara2413](https://github.com/sara2413)

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
