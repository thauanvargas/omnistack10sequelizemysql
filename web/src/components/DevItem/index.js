import React from "react";

export default function DevItem({ dev }) {
  return (
    <li key={dev.github_username} className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}></img>
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs}</span>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil do Github
      </a>
    </li>
  );
}
