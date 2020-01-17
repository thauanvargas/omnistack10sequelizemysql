import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import api from "../../services/api";

export default function DevItem({ dev, onSubmit }) {
  let mainRef = useRef(null);
  const [name, setName] = useState("");
  const [tech, setTech] = useState("");
  const [focused, setFocused] = useState("");

  // useEffect(() => {
  //   mainRef.current.focus();
  // }, [mainRef]);

  async function handleBlurEvent(e) {
    setFocused("");
    const { name, value, github } = e.target;
    console.log(github);

    api.put(`/devs/${github}`, { [name]: value });
  }

  async function handleDelete(e) {
    e.preventDefault();
    console.log(e.target);
    const response = await api.delete(`/devs/${e.target.user}`);
  }

  function onEnter(e) {
    if (e.keyCode == 27) {
      setFocused("");
    }
    if (e.keyCode == 13) {
      e.preventDefault();
      setFocused("");
      handleBlurEvent();
    }
  }

  return (
    <li key={dev.github_username} className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name}></img>
        <div className="user-info">
          {focused != "nameUpdate" ? (
            <strong onDoubleClick={() => setFocused("nameUpdate")}>
              {dev.name}
            </strong>
          ) : (
            <input
              autoFocus
              onBlur={handleBlurEvent}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => onEnter(e)}
              github={dev.github_username}
              value={name}
              name="nameUpdate"
              id="nameUpdate"
              required
            ></input>
          )}
          {focused != "techUpdate" ? (
            <span onDoubleClick={() => setFocused("techUpdate")}>
              {dev.techs}
            </span>
          ) : (
            <input
              autoFocus
              onBlur={handleBlurEvent}
              onChange={e => setTech(e.target.value)}
              onKeyDown={e => onEnter(e)}
              value={tech}
              name="techUpdate"
              id="techUpdate"
              required
            ></input>
          )}
        </div>
        {/* <div>
            <button user={dev.github_username} onClick={handleDelete}>
              Delete
            </button>
          </div> */}
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil do Github
      </a>
    </li>
  );
}
