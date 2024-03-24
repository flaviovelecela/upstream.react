import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { fetchUserAttributes, updateUserAttribute } from 'aws-amplify/auth';

function ProfilePage() {
  const [userAttributes, setUserAttributes] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUserAttributes() {
      setIsLoading(true);
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
        setNewDisplayName(attributes['custom:DisplayName'] || '');
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
    getUserAttributes();
  }, []);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      const output = await updateUserAttribute({
        userAttribute: {
          attributeKey: 'custom:DisplayName',
          value: newDisplayName,
        },
      });
      
      setUserAttributes(prev => ({
        ...prev,
        'custom:DisplayName': newDisplayName,
      }));
      
      setEditMode(false);
    } catch (error) {
      console.log('Error updating user attributes:', error);
      setError(error.message || 'An error occurred');
    }
  };

  // Handler for input change to update state
  const handleChangeDisplayName = (e) => {
    setNewDisplayName(e.target.value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <div>
        <p><strong>Username:</strong>
        {editMode ? (
          <>
            <input
              type="text"
              value={newDisplayName}
              onChange={handleChangeDisplayName}
            />
            <button onClick={handleSaveClick}>Save</button>
          </>
        ) : (
          <>
            <span> {userAttributes['custom:DisplayName']}</span>
            <button onClick={handleEditClick}>Edit</button>
          </>
        )}
        </p>
      </div>
      <p><strong>Steam ID:</strong> {userAttributes['custom:SteamID']}</p>
    </div>
  );
}

export default ProfilePage;
