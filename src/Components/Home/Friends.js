import React, { useState } from 'react';
import './Dashboard.css';
import { Heading } from '@aws-amplify/ui-react';

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
    <div>
      <Heading>Friends List</Heading>
      <button onClick={addFriend}>Add Friend</button>
      <ul>
        {friends.map(friend => (
          <li key={friend.id}>
            <img src={friend.profilePicture} alt={friend.username} />
            <span>{friend.username}</span>
            <button onClick={() => deleteFriend(friend.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Friends;