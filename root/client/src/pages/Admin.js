import { useEffect,useState } from "react"

//components 
import DoctorDetails from '../components/Admin/DoctorDetails'
import AdminDeleteDoctor from '../components/Admin/AdminDeleteDoctor'

const Home = () => {
    const [doctors,setdoctors] = useState(null)

    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch('/admins/viewUnregisteredDoctors')
            const json = await response.json()

            if (response.ok)
            {
                setdoctors(json)
            }
        }
        fetchDetails()
    },[])


    return(
        <div classname = "home">
            <h2>Doctor Details</h2>
            <div className = "Unregistered Doctors">
                {doctors && doctors.map((doctor) => (
                    <DoctorDetails key = {doctor._id} doctor = {doctor}/> ))}
            </div>
            <AdminDeleteDoctor />
        </div>
        
    )
}

export default Home