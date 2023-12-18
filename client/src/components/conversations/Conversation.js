
import "./conversation.css"
import {useEffect,useState} from "react"

export default function Conversation({conversation,currentUser}) {
    const [user,setUser] = useState([])
    const PF=process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
     const friendId= conversation.members.find(m=>m !== currentUser._id)
        console.log(friendId + "friendId")
     const getUser = async ()=>{
         try {
            const response = await fetch(`/conversation/getUserById/${friendId}`);
            const data = await response.json();
            console.log(data + "data in convo")
            setUser(data)
         } catch (error) {
             console.log(error)
         }
     };
     getUser(currentUser,conversation)


    },[currentUser,conversation])
    
    
    
    return (
        <div className="conversation">
            <img 
            className="conversationImg" 
            src={user?.profilePicture?user.profilePicture: PF+"person/noAvatar.png"}
            alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    )
}