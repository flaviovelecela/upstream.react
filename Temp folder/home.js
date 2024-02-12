import React from 'react';
import './home.css'
import { withAuthenticator, Button, Heading } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = ({signOut, user}) => {
  return (
    <div id="mainpage">
      <div className="container">
      <Heading level={4}> Upstream </Heading>
          <button onClick={signOut}>Sign Out</button>
          <p>
            Hello {user.username}
          </p>
      </div>
      <table>
        <caption> All Games Played</caption>
        <tbody>
          <tr>
            <th>#</th>
            <th>Game Cover</th>
            <th>Title</th>
            <th>Achievement%</th>
            <th>Rating</th>
            <th>Status</th>
          </tr>

          <tr class="game-row">
            <td class="game-number">1</td>
            <td><img img src="https://upload.wikimedia.org/wikipedia/en/thumb/c/cc/Hades_cover_art.jpg/220px-Hades_cover_art.jpg"
              alt="Hades"></img></td>
            <td>Hades</td>
            <td>6%</td>
            <td>N/A</td>
            <td>Currently Playing</td>
          </tr>

          <tr class="game-row" data-status="on-hold">
            <td class="game-number">2</td>
            <td><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Celeste_box_art_full.png/1200px-Celeste_box_art_full.png"
              alt="Celeste"></img></td>
            <td>Celeste</td>
            <td>100%</td>
            <td>10/10</td>
            <td>On Hold</td>
          </tr>

          <tr class="game-row" data-status="dropped">
            <td class="game-number">3</td>
            <td><img src="https://upload.wikimedia.org/wikipedia/en/6/6d/Bethesda_Starfield.jpg"
              alt="Starfield"></img>
            </td>
            <td>Starfield</td>
            <td>32%</td>
            <td>N/A</td>
            <td>Quit Playing</td>
          </tr>

          <tr class="game-row" data-status="planning">
            <td class="game-number">4</td>
            <td><img src="https://upload.wikimedia.org/wikipedia/en/8/85/Tunic_cover_art.jpg" alt="Tunic"></img>
            </td>
            <td>Tunic</td>
            <td>7%</td>
            <td>N/A</td>
            <td>Planning to Play</td>
          </tr>

          <tr class="game-row" data-status="completed">
            <td class="game-number">5</td>
            <td><img src="https://upload.wikimedia.org/wikipedia/en/d/de/Lies_of_p_cover_art.jpg"
              alt="Lies of P"></img>
            </td>
            <td>Lies of P</td>
            <td>100%</td>
            <td>10/10</td>
            <td>Completed</td>
          </tr>
        </tbody>
      </table>
      <table id="footer">
        <th><a href="#" onclick="return show('all');">All Games Played</a></th>
        <th><a href="#" onclick="return show('completed');">Completed Games</a></th>
        <th><a href="#" onclick="return show('planning');">Games Up Next</a></th>
        <th><a href="#" onclick="return show('currently-playing');">Currently Playing</a></th>
        <th><a href="#" onclick="return show('on-hold');">Games On Hold</a></th>
        <th><a href="#" onclick="return show('dropped');">Games/Dropped Quit</a></th>
      </table>
    </div>
  )
}
export default withAuthenticator(Home);