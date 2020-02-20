const express = require('express')
const server = express()

server.use(express.json())
function checkProjectExists(req,res,next) {
  const {id} = req.params
  const project = projects.find(p=> p.id==id)
    if(!project){
      return res.status(400).json({erro:'O id é obrigatório'})
  }
  next()
}
function countRequest(req,res,next) {
  console.count('Número de requisiçoes')
  next()
}

server.use(countRequest)



const projects =[]

//ROTAS
server.post('/projects',(req,res)=>{
  const project = {id: req.body.id,title: req.body.title, tasks:[]}
  projects.push(project)
  return res.json(project)
})
server.get('/projects',(req,res)=>{
  return res.json(projects)
})
server.put('/projects/:id',checkProjectExists,(req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);
  project.title = title;
  return res.json(project);
});
server.delete('/projects/:id',checkProjectExists,(req,res)=>{
  const {id}= req.params
  const index = projects.findIndex(p=>p.id==id)
  projects.splice(index,1)
  return res.send()
})
server.post('/projects/:id/tasks',checkProjectExists,(req,res)=>{
  const {task} = req.body
  const {id} = req.params
  const project = projects.find(p => p.id == id )
  project.tasks.push(task)
  return res.json(project)
})



server.listen(3333,() =>{
  console.log("Rodando em http://localhost:3333")
})