import React, { useState, useEffect } from "react";

export default function DevForm({ onSubmit }) {
  const [github_username, setGitHubUsername] = useState("");
  const [techs, setTechs] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude
    });

    setGitHubUsername("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          onChange={e => setGitHubUsername(e.target.value)}
          value={github_username}
          name="github_username"
          id="github_username"
          required
        ></input>
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          onChange={e => setTechs(e.target.value)}
          value={techs}
          name="techs"
          id="techs"
          required
        ></input>
      </div>
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            onChange={e => setLatitude(e.target.value)}
            type="number"
            name="latitude"
            id="latitude"
            value={latitude}
            required
          ></input>
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            onChange={e => setLongitude(e.target.value)}
            type="number"
            name="longitude"
            id="longitude"
            value={longitude}
            required
          ></input>
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
