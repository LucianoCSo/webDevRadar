import React, {useState, useEffect} from 'react';

function DevForm({onSubmit}){
    const [github_username, setgithub_username] = useState('');
    const [techs, settechs] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

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
      }, []);

      async function handleAddUserDev(e){
        e.preventDefault();

        await onSubmit({
            github_username,
            techs,
            longitude,
            latitude, 
          });

          setgithub_username('');
          settechs('');
      }

    return (
        
        <form onSubmit={handleAddUserDev}>
          <div className="input-block">
            <label htmlFor="gitHub-username">Usuário do Github: </label>
            <input name="gitHub-username" id="gitHub-username" required 
            value={github_username} onChange={e => setgithub_username(e.target.value)} />
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
    );
}

export default DevForm;