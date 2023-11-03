import { useEffect, useState} from "react";

// css
import '../css/Home.css';

const Home = () =>{
  const [doctors, setDoctors] = useState(null);
  const [searchName, setSearchName] = useState('');
  const [searchSpecialty, setSearchSpecialty] = useState('');
  const [filterSpecialty, setFilterSpecialty] = useState('');
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('patients/viewDoctors');
        const data = await response.json();
        
        if (response.ok) {
          setDoctors(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchDoctors();
  }, []);


  const handleSearch = async () => {
    console.log('Search Clicked'); // Check if the function is triggered
    console.log(`Search Name: ${searchName}, Search Specialty: ${searchSpecialty}`); // Check the input values
  
    try {
      const response = await fetch(`patients/searchForDoctor?name=${searchName}&specialty=${searchSpecialty}`);
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = async () => {
    try {
      const response = await fetch(`/patients/filterDoctors?specialty=${filterSpecialty}&date=${filterDate}`);
      if (response.ok) {
        const data = await response.json();
        setDoctors(data);
      }
    } catch (error) {
      console.error(error);
    }
  }
    
/*const [workouts , setWorkouts]= useState(null)

  useEffect(() =>{
    const fetchworkouts = async () => {
   const response = await fetch('http:localhost:4000/api/workouts')
        const json =await response.json()

        if (response.ok){
          setWorkouts(json)
        }
    }
    fetchworkouts()
  },[])
  
 
*/
   
return (
  <div className="doctor-container">
    <div className="search-container">
      <input
        type="text"
        placeholder="Search by name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by specialty"
        value={searchSpecialty}
        onChange={(e) => setSearchSpecialty(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
    <div className="filter-container">
      <input
        type="text"
        placeholder="Filter by specialty"
        value={filterSpecialty}
        onChange={(e) => setFilterSpecialty(e.target.value)}
      />
      <input
        type="text"
        placeholder="Filter by date"
        value={filterDate}
        onChange={(e) => setFilterDate(e.target.value)}
      />
      <button onClick={handleFilter}>Filter</button>
    </div>
    <div className="doctor-list">
      {doctors && doctors.map((doctor) => (
        <div key={doctor._id}>
          <p><strong>Name: </strong>{doctor.fName} {doctor.lName}</p>
          <p><strong>Email: </strong>{doctor.email}</p>
          <p><strong>Specialty: </strong>{doctor.specialty}</p>
          <p><strong>Educational Background: </strong>{doctor.educationalBackground}</p>
          <p><strong>Hourly Rate: </strong>{doctor.hourlyRate}$</p>
          <p><strong>Session Price: </strong>{doctor.sessionPrice}</p>
          <p><strong>-----------------------------------------------</strong></p>
        </div>
      ))}
    </div>
  </div>
);
}
export default Home;