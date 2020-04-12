import React, {useState,useEffect} from "react";
import api from "./services/api"
import "./styles.css";

function App() {


  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get("/repositories").then(repositoriesList => {
      console.log(repositoriesList)
      setRepositories(repositoriesList.data)
    })
  },[])

  async function handleAddRepository() {
    api.post("/repositories",{
      title:`Novo Repositorio ${Date.now()}`,
      url:"https://github.com/Rocketseat/bootcamp-gostack-desafios/",
      owner:"Gabriel Darruiz",
      techs:[
        "React JS",
        "Node JS",
        "React Native",
        "C# .Net"
      ]
    }).then(response => {
      console.log(response.data)
      debugger
      if(response.status === 200){
        setRepositories([...repositories,response.data])
      }
    })
  }

  async function handleRemoveRepository(id) {
    api.delete("/repositories/"+id).then(response =>{
      if(response.status === 204)
      {
        debugger
        var index = repositories.findIndex(repository => repository.id === id)
        repositories.splice(index,1)
        if(index >= 0){
          setRepositories([...repositories])
        }
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {
          repositories.map(repository => (
            <li key={repository.id}>
              {repository.title}
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
            </li>
          ))
          }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
