import React, { useEffect, useState } from "react";
import qs from "qs";

import Pagination from "./components/pagination/Pagination";
import Search from "./components/search/search";
import "./styles.css";

const api = "https://kitsu.io/api/edge/";
const LIMIT = 12;

export default function App() {
  const [info, setInfo] = useState({});
  const [text, setText] = useState("");
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const query = {
      page: {
        limit: LIMIT,
        offset
      }
    };

    if (text) {
      query.filter = {
        text
      };
    }

    setInfo({});
    fetch(`${api}anime?${qs.stringify(query)}`)
      .then((response) => response.json())
      .then((response) => {
        setInfo(response);
      });
  }, [text, offset]);

  return (
    <div className="App">
      <h1>Nexflix animes</h1>
      <Search value={text} onChange={(search) => setText(search)} />
      {text && !info.data && <span>Carregando....</span>}
      {info.data && (
        <ul className="anime-list">
          {info.data.map((anime) => (
            <li key={anime.id}>
              <img
                src={anime.attributes.posterImage.small}
                alt={anime.attributes.canonicalTitle}
              />
              {anime.attributes.canonicalTitle}
            </li>
          ))}
        </ul>
      )}
      {info.meta && (
        <Pagination
          limit={LIMIT}
          total={info.meta.count}
          offset={offset}
          setOffset={setOffset}
        />
      )}
    </div>
  );
}
