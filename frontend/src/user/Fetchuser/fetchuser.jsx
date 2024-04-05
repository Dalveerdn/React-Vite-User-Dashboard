import React, { useState } from "react";
import "./fetchuser.css";

function UserDetails() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);

  const fetchUserDetails = () => {
    setLoading(true);
    fetch(
      "https://b7faf7df-94a8-44e1-a7a3-e5bc301a2ae8-00-36c8vbbyvxtcl.sisko.replit.dev/get-details",
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
        setUserDetailsVisible(true); // Show userDetails when data is fetched
      })
      .catch((error) => {
        console.error("There was a problem with your fetch operation:", error);
        setError(error);
        setLoading(false);
      });
  };

  return (
    <div>
      <button className="fetch-user" type="button" onClick={fetchUserDetails}>
        Fetch User
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {userDetailsVisible && ( // Render userDetails only if userDetailsVisible is true
        <div id="userDetails" className="centered">
          {users.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDetails;
