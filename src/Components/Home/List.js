import React, { useState } from 'react';
import './GameList.css'

function GameLists() {
  const [lists, setLists] = useState([]);
  const [newListName, setNewListName] = useState('');
  const [gameToAdd, setGameToAdd] = useState({ title: '', category: '', description: '' });
  const [selectedListIndex, setSelectedListIndex] = useState(null);

  const createList = () => {
    if (newListName !== '') {
      const newList = {
        name: newListName,
        games: [],
      };
      setLists([...lists, newList]);
      setNewListName('');
    }
  };

  const addGameToList = () => {
    if (selectedListIndex !== null && gameToAdd.title !== '') {
      const updatedLists = [...lists];
      updatedLists[selectedListIndex].games.push({...gameToAdd});
      setLists(updatedLists);
      setGameToAdd({ title: '', category: '', description: '' }); // Reset input fields
    }
  };

  return (
    <div className="game-lists-container">
      <div className="form-container">
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder="New List Name"
          className="new-list-input"
        />
        <button onClick={createList} className="new-list-button">Create New List</button>
      </div>
      
      {lists.length > 0 && (
        <div className="add-game-form">
          <select 
            onChange={(e) => setSelectedListIndex(e.target.value)} 
            defaultValue="" 
            className="list-select"
          >
            <option value="" disabled>Select List</option>
            {lists.map((list, index) => (
              <option key={index} value={index}>{list.name}</option>
            ))}
          </select>
          <input
            type="text"
            value={gameToAdd.title}
            onChange={(e) => setGameToAdd({ ...gameToAdd, title: e.target.value })}
            placeholder="Game Title"
            className="game-input"
          />
          <input
            type="text"
            value={gameToAdd.category}
            onChange={(e) => setGameToAdd({ ...gameToAdd, category: e.target.value })}
            placeholder="Category"
            className="game-input"
          />

          <button onClick={addGameToList} className="add-game-button">Add Game to List</button>
        </div>
      )}
  
      <div className="game-lists">
        {lists.map((list, index) => (
          <div key={index} className="list">
            <h2 className="list-title">{list.name}</h2>
            {list.games.map((game, gameIndex) => (
              <div key={gameIndex} className="game">
                <p className="game-title">Title: {game.title}</p>
                <p className="game-category">Category: {game.category}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GameLists;