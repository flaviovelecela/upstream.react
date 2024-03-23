
import React, { useState } from 'react';
import './Friends.css'
import { Heading } from '@aws-amplify/ui-react';

<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"></link>

function Friends() {
  const [friends, setFriends] = useState([
    { id: 1, username: 'John', profilePicture: 'john.jpg' },
    { id: 2, username: 'Jane', profilePicture: 'jane.jpg' },
    { id: 3, username: 'Doe', profilePicture: 'doe.jpg' },
  ]);

  const addFriend = () => {
    // Implement functionality to add a friend
  };

  const deleteFriend = (id) => {
    // Implement functionality to delete a friend
    setFriends(friends.filter(friend => friend.id !== id));
  };

  return (
    <div className="friends-list-container">
      <h2 className="friends-list-title">Friends List</h2>
      <div className="friends-list">
        {friends.map((friend) => (
          <div className="friend-card" key={friend.id}>
            <img className="friend-img" src={friend.profilePicture} alt={friend.username} />
            <span className="friend-name">{friend.username}</span>
            <button className="friend-action-button delete-friend-btn">Delete</button>
          </div>
        ))}
      </div>
      <button className="friend-action-button add-friend-btn">Add Friend</button>
    </div>
  );
}

export default Friends;