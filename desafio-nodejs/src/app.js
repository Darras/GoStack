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
  var {title,url,techs} = request.body
  var repository = {id:uuid(), title:title,url:url,techs:techs,likes:0}
  repositories.push(repository)
  response.json(repository)

});

app.put("/repositories/:id", (request, response) => {
  var repo = repositories.findIndex(repository => repository.id == request.params.id);

  if(repo >= 0){
    var test = {...repositories[repo], title:request.params.title}
    const {title,url,techs} = request.body;


    repositories[repo] = { 
      ...repositories[repo],
      title : title === undefined ? repositories[repo].title : title,
      url: url === undefined ? repositories[repo].url : url,
      techs: techs === undefined ? repositories[repo].techs : techs,
    }
    return response.json(repositories[repo])
  }else{
    return response.status(400).send()
  }
});

app.delete("/repositories/:id", (request, response) => {
  var repo = repositories.findIndex(repository => repository.id == request.params.id);
  if(repo >= 0){
    repositories.splice(repo,1);
    
    return response.status(204).send()
  }else{
    return response.status(400).send()
  }
});

app.post("/repositories/:id/like", (request, response) => {
  var repo = repositories.findIndex(repository => repository.id === request.params.id)

  if(repo !== undefined && repo >= 0){
    repositories[repo].likes ++;
    return response.json({likes:repositories[repo].likes});
  }else{
    return response.status(400).send()
  }
});

module.exports = app;
