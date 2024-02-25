import { useContext, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom'
import axios from 'axios'



export default function Dashboard() {
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate()
  
  const logoutUser = () => {
    setUser(null)
    navigate('/login')
  }

  useEffect(() => {
    if (!user) {
      axios
        .get("/profile")
        .then(({ data }) => {
          setUser(data);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
        });
    }
  },[])

  return (
    <div>
      <h1>Dashbaord</h1>
      {user ? (
        <>
          <h2>Hi {user.name} </h2>
          <button onClick={logoutUser}>Logout</button>
        </>
      ) : (
        <p>Loading user data...</p>
      )}
    </div>
  );
}
