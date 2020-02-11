import React, {useState, useEffect} from 'react';
import api from './api';
import Devitem from './componentes/DevItem';
import DevForm from './componentes/DevForm';

import './global.css';
import './Sidebar.css';
import './Main.css';
import './App.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
  }, [])

  async function handleAddUserDev(data){

    var response = await api.post('devs', data);

    async function loadDevs(){
      response = await api.get('/devs');
      setDevs(response.data);
    }
    loadDevs();
    //setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddUserDev} />
      </aside>
      <main>
          <ul>
            {devs.map(dev => (
              <Devitem key={dev._id} dev={dev} />
            ))}                   
          </ul>
      </main>
    </div>
  );
}

export default App;
