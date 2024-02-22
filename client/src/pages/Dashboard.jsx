import { useContext } from "react";
import { UserContext } from "../../context/userContext";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  console.log("From Dashboard:", user); // Check if user data is available
  return (
    <div>
      <h1>Dashbaord</h1>
      {user ? <h2>Hi {user.name} </h2> : <p>Loading user data...</p>}
    </div>
  );
}
