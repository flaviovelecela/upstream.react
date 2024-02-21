import React, { useState, useEffect } from 'react';
import { fetchUserAttributes } from 'aws-amplify/auth';

function SteamGamesList() {
  const [games, setGames] = useState([]);
  const apiKey = '94A07FD5B1267700D27D6D2B3CF9583C';

  useEffect(() => {
    const fetchGames = async (steamId) => {
      try {
        const response = await fetch(`/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=1`);
        const data = await response.json();
        setGames(data.response.games);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    const fetchSteamId = async () => {
      try {
        const attributes = await fetchUserAttributes();
        console.log('User attributes:', attributes)
        const steamId = attributes['custom:SteamID']; // Access the SteamID directly
        if (steamId) {
          fetchGames(steamId);
        }
      } catch (error) {
        console.error('Error fetching SteamID: ', error);
      }
    };

    fetchSteamId();
    fetchGames();
  }, []);

  return (
    <div>
      <h1>Owned Games</h1>
      <ul>
        {games.map(game => (
          <li key={game.appid}><img src={`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt='game.name' /> {game.name} | {game.appid} |</li>
        ))}
      </ul>
    </div>
  );
}

export default SteamGamesList;