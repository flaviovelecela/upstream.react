import React, { useState, useEffect } from 'react';

function SteamGamesList() {
  const [games, setGames] = useState([]);
  const steamId = '76561198311677632';
  const apiKey = '94A07FD5B1267700D27D6D2B3CF9583C';

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${apiKey}&steamid=${steamId}&format=json&include_appinfo=1`)
        ;
        const data = await response.json();
        setGames(data.response.games);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchGames();
  }, []);

  return (
    <div>
      <h1>Owned Games</h1>
      <ul>
        {games.map(game => (
          <li key={game.appid}><img src={`http://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`} alt='game.name' /> {game.name} | {game.appid} |</li>
        ))}
      </ul>
    </div>
  );
}

export default SteamGamesList;