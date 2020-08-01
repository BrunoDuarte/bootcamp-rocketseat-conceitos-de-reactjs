import React, {useState, useEffect} from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepository] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Desafio Node.js - ${Date.now()}`,
      url: "https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-conceitos-nodejs",
      techs: ["Node.js", "React", "React Native"]
    })

    const repository = response.data
    setRepository([...repositories, repository])
    console.log(repositories)
  }

  async function handleRemoveRepository(id) {
    console.log(id)
    const response = await api.delete('repositories/' + id)
    api.get('repositories').then(response => {
      setRepository(response.data)
    })
    return response
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
