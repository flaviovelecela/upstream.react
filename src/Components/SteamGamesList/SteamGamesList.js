import React, { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Heading } from '@aws-amplify/ui-react';
import './SteamGamesList.css';

const ITEMS_PER_PAGE = 10;

function SteamGamesList() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [games, setGames] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [achievements, setAchievements] = useState({});
  const [userSteamId, setUserSteamId] = useState(null);
  const ngrokUrl = 'https://af64-2603-9000-9600-4501-00-100a.ngrok-free.app';

  //FIRST useEffect
  useEffect(() => {
    const fetchGames = async (steamId, pageNumber) => {
      const offset = (pageNumber - 1) * ITEMS_PER_PAGE;
      try {
        const response = await fetch(
          `${ngrokUrl}/getGames/${steamId}?start=${offset}&count=${ITEMS_PER_PAGE}`,
          {
            method: 'GET',
            headers: {
              'ngrok-skip-browser-warning': 'true',
              Accept: 'application/json'
            },
          }
        );
        const data = await response.json();
        console.log(data)
        if (response.ok && Array.isArray(data)) {
          setGames(data);
          setTotalPages(Math.ceil(data.totalNumberOfGames / ITEMS_PER_PAGE));
        } else {
          console.error('Games data is not in the expected format:', data);
        }
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    const fetchSteamId = async () => {
      try {
        const attributes = await fetchUserAttributes();
        console.log('User attributes:', attributes);
        const steamId = attributes['custom:SteamID'];
        if (steamId) {
          setUserSteamId(steamId);
          await fetchGames(steamId, currentPage);
        }
      } catch (error) {
        console.error('Error fetching SteamID:', error);
      }
    };

    fetchSteamId();
  }, [currentPage]);

  const fetchAchievements = async (steamId, appId) => {
    console.log(`Fetching achievements for steamId: ${steamId}, appId: ${appId}`);
    try {
      const response = await fetch(`${ngrokUrl}/getAchievements/${steamId}/${appId}`, {
        method: 'GET',
        headers: {
          'ngrok-skip-browser-warning': 'true',
          Accept: 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const text = await response.text();
      let data = text === "-1" ? -1 : JSON.parse(text);

      // If the data is a number, store it directly.
      if (!isNaN(data)) {
        data = parseInt(data); // or parseFloat(data) if the number can be a float
      }

      setAchievements(prevAchievements => ({
        ...prevAchievements,
        [appId]: data.playerstats?.achievements || data
      }));

    } catch (error) {
      console.error('Error fetching achievements:', error);
      setAchievements(prevAchievements => ({
        ...prevAchievements,
        [appId]: -1 // Indicates an error occurred
      }));
    }
  };

  const filteredGames = statusFilter === 'all' || statusFilter === '' //Probs add statuses to filter
    ? games
    : games.filter((game) => game.status === statusFilter);

  //SECOND useEffect

  useEffect(() => {
    setTotalPages(Math.ceil(filteredGames.length / ITEMS_PER_PAGE));
  }, [filteredGames]);

  //THIRD useEffect

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value === 'all' ? '' : e.target.value);
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const selectedGames = filteredGames.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  const handleStatusChange = async (appid, newStatus) => {
    // Here you could update the state or send the new status to your backend
    const updatedGames = games.map((game) => {
      if (game.appid === appid) {
        return { ...game, statusText: newStatus };
      }
      return game;
    });
    setGames(updatedGames);
  };

  return (
    <div id="mainpage">
      <div className='container'>
        <Heading level={4} id="Upstreamtitle">Games Overview
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className='small-dropdown'
            style={{ position: 'absolute', marginLeft: 20, marginTop: 3, fontSize: 13 }}>

            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="planning">Up Next</option>
            <option value="currently-playing">Currently Playing</option>
            <option value="on-hold">On Hold</option>
            <option value="dropped">Dropped Quit</option>
          </select></Heading>
      </div>
      <table id="games-list">
        <tbody>
          <tr className='gameheader'>
            <th>#</th>
            <th>Game Logo</th>
            <th>Title</th>
            <th>Achievement%</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>
          {selectedGames.map((game, index) => (
            <tr className='game-row' key={game.appId} data-status={game.status}>
              <td className='game-number'>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
              <td>
                <img className='gamepic' src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appId}/${game.imageIcon}.jpg`} alt={game.name} />
              </td>
              <td>{game.name}</td>
              <td>
                {
                  achievements[game.appId] === -1
                    ? 'No achievements'
                    : typeof achievements[game.appId] === 'number'
                      ? `${achievements[game.appId]}%`
                      : Array.isArray(achievements[game.appId]) && achievements[game.appId].length > 0
                        ? achievements[game.appId].map((achievement, index) => (
                          <div key={index}>
                            {achievement.name || `Achievement ${index + 1}`}: {achievement.achieved ? 'Earned' : 'Not earned'}
                          </div>
                        ))
                        : <button onClick={() => fetchAchievements(userSteamId, game.appId)} className='small-button'>Show %</button>
                }
              </td>
              <td>
                <select
                  value={game.statusText || 'N/A'}
                  className='small-dropdown'
                  style={{ fontSize: 13 }}
                >
                  <option value="N/A">N/A</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
              </td>
              <td>
                <select
                  value={game.statusText || 'N/A'}
                  onChange={(e) => handleStatusChange(game.appid, e.target.value)}
                  className='small-dropdown'
                  style={{ fontSize: 13 }}
                >
                  <option value="N/A">N/A</option>
                  <option value="Completed">Completed</option>
                  <option value="Up Next">Up Next</option>
                  <option value="Currently Playing">Currently Playing</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Dropped">Dropped</option>
                  <option value="Quit">Quit</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {currentPage > 1 && (
          <button onClick={goToPreviousPage}>Previous</button>
        )}
        {currentPage < totalPages && (
          <button onClick={goToNextPage}>Next</button>
        )}
      </div>
    </div>
  );
}

export default SteamGamesList;