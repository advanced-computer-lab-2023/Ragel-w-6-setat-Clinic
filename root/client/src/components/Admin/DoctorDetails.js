const DoctorDetails = ({doctor}) => {
    return (
        <div className = "doctor-details">
            <p><strong> Username : </strong>{doctor.username}</p>
            <p><strong> Email : </strong>{doctor.email}</p>
            <p><strong> First Name : </strong>{doctor.fName}</p>
            <p><strong> Last Name : </strong>{doctor.lName}</p>
            <p><strong> Date of Birth : </strong>{doctor.dateOfBirth}</p>
            <p><strong> Educational Background : </strong>{doctor.educationalBackground}</p>
            <p><strong> Hourly Rate : </strong>{doctor.hourlyRate}</p>
            <p><strong> Affiliation : </strong>{doctor.affiliation}</p>
            <p><strong> Specialty : </strong>{doctor.specialty}</p>
        </div>
    )
}

export default DoctorDetails