import React, {useState, useEffect} from 'react';
import api from './api';

import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';

function App() {
  const [gitHubUsername, setgitHubUsername] = useState('');
  const [techs, settechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [devs, setDevs] = useState([]);
  useEffect(() =>{
   
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (erro) => {
        console.log(erro);
      },
      {
        timeout: 3000,
      }
    )
  }, [])

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, [])

  async function handleAddUserDev(e){
    e.preventDefault();

    const response = await api.post('devs', {
      gitHubUsername,
      techs,
      longitude,
      latitude, 
    });
    setgitHubUsername('');
    settechs('');
    console.log(response);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddUserDev}>
          <div className="input-block">
            <label htmlFor="gitHub-username">Usuário do Github: </label>
            <input name="gitHub-username" id="gitHub-username" required 
            value={gitHubUsername} onChange={e => setgitHubUsername(e.target.value)} />
          </div>
          <div className="input-block">
            <label htmlFor="techs">Tscnologias: </label>
            <input name="techs" id="techs" required 
            value={techs} onChange={e => settechs(e.target.value)} />
          </div>
          
          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">Latitude: </label>
              <input name="latitude" id="latitude" required value={latitude} 
              onChange={e => setLatitude(e.target.value)} />
            </div>
            <div className="input-block">
              <label htmlFor="longitude">Longitude: </label>
              <input name="longitude" id="longitude" required value={longitude} 
              onChange={e => setLongitude(e.target.value)} />
            </div>
          </div>
          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
          <ul>
            {devs.map(dev => 
              (<li key={dev._id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(', ')}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a href={`https://github.com/${dev.gitHub_userName}`}>Acessar perfil no Github</a>
            </li>))}                   
          </ul>
      </main>
    </div>
  );
}

export default App;
