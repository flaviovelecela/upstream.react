import React, { useState, useEffect } from 'react';
import './UserProfile.css'
import { fetchUserAttributes } from 'aws-amplify/auth';

function ProfilePage() {
  const [userAttributes, setUserAttributes] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUserAttributes() {
      setIsLoading(true);
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes({
          email: attributes.email,
          displayName: attributes['custom:DisplayName'],
          steamId: attributes['custom:SteamID'],
        });
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
      setIsLoading(false);
    }

    getUserAttributes();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching user attributes: {error}</div>;
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <p><strong>Username:</strong> {userAttributes.displayName}</p>
      <p><strong>Steam ID:</strong> {userAttributes.steamId}</p>
    </div>
  );
}

export default ProfilePage;