import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrgNavBar from './OrgNavBar';
import ProfileCard from './ProfileCard';

function OrgDashBoard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://muqtirath-wiegnite.onrender.com/users'); 
        setUsers(response.data.users); 
        console.log(response)
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users.');
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <OrgNavBar />
      <br />
      <br />
      <br />
      <div className="grid gap-3 p-2 grid-cols-1 md:grid-cols-3">
        {error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : (
          users.map((user, index) => (
            <ProfileCard
              key={index}
              name={user.username}
              gender={user.gender}
              story={user.story}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default OrgDashBoard;
