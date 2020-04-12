const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  
  var time = "";
  console.time(time);
  var {title,url,techs} = request.body
  var repository = {id:uuid(), title:title,url:url,techs:techs,likes:0}
  repositories.push(repository)
  response.json(repository)
  console.timeEnd(time);
  console.log(time);
});

app.put("/repositories/:id", (request, response) => {
  var repo = repositories.findIndex(repository => repository.id == request.params.id);

  if(repo >= 0){
    repositories[repo] = {
      id:request.params.id,
      title:request.body.title,
      url:request.body.url,
      techs:request.body.techs,
      likes:repositories[repo].likes
    }
    return response.status(204).json(repositories[repo])
  }else{
    return response.status(400).send()
  }
});

app.delete("/repositories/:id", (request, response) => {
  var repo = repositories.findIndex(repository => repository.id == request.params.id);
console.log(repo)
  if(repo >= 0){
    repositories.splice(repo,1);
    
    return response.status(204).json({sucesso:"OK"})
  }else{
    return response.status(400).send()
  }
});

app.post("/repositories/:id/like", (request, response) => {
  var repo = repositories.findIndex(repository => repository.id === request.params.id)

  if(repo !== undefined && repo >= 0){
    repositories[repo].likes ++;
    return response.status(204);
  }else{
    return response.status(400).send()
  }
});

module.exports = app;
