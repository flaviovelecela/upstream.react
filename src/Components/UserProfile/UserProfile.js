import React, { useState, useEffect } from 'react';
import './UserProfile.css';
import { fetchUserAttributes, updateUserAttribute } from 'aws-amplify/auth';

function ProfilePage() {
  const [userAttributes, setUserAttributes] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newBio, setNewBio] = useState(''); // State for bio
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getUserAttributes() {
      setIsLoading(true);
      try {
        const attributes = await fetchUserAttributes();
        setUserAttributes(attributes);
        setNewDisplayName(attributes['custom:DisplayName'] || '');
        setNewBio(attributes['custom:Bio'] || ''); // Set bio from fetched attributes
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
      await updateUserAttribute({
        userAttribute: {
          attributeKey: 'custom:DisplayName',
          value: newDisplayName,
        },
      });
      //await updateUserAttribute({
      //  userAttribute: {
      //    attributeKey: 'custom:Bio',
      //    value: newBio,
      //  },
      //}); // Update bio attribute
      
      setUserAttributes(prev => ({
        ...prev,
        'custom:DisplayName': newDisplayName,
        //'custom:Bio': newBio,
      }));
      
      setEditMode(false);
    } catch (error) {
      console.log('Error updating user attributes:', error);
      setError(error.message || 'An error occurred');
    }
  };

  const handleChangeDisplayName = (e) => {
    setNewDisplayName(e.target.value);
  };

  const handleChangeBio = (e) => {
    setNewBio(e.target.value);
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
      {isLoading ? (
        <div className="loading">Loading...</div>
      ) : error ? (
        <div className="error">Error: {error}</div>
      ) : (
        <>
          <div className="user-info">
            <p>
              <strong>Username:</strong>
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

          <div className="bio-info">
            <p>
              <strong>Bio:</strong>
              <input
                type="text"
                value={newBio}
                onChange={handleChangeBio}
                placeholder="Your bio here"
              />
              {/* Assuming you will add a separate save function for bio */}
            </p>
          </div>

          <div className="other-info">
            <p>
              <strong>Steam ID:</strong> {userAttributes['custom:SteamID']}
            </p>
          </div>
        </>
      )}
    </div>
  );
  
}

export default ProfilePage;
