const { Router } = require('express')
const { checkProjectIdExist } = require('./middlewares')
const { projects } = require('./data')

const routes = new Router()
const findProject = (id) => projects.find(project=>project.id ==id)
/* 
  Return all projects 
*/
routes.get('/projects',(req,res)=> res.json(projects))

/* 
  Insert new project
*/
routes.post('/projects',(req,res)=>{
  const {title,id} = req.body
  if(!title || !id ){
    return res.status('400').json({
      error: 'Validation failed; Review the request structure!'
    })
  }

  const checkIdExist = projects.some(project => project.id==id)

  if(checkIdExist){
    return res.status('400').json({
      error: 'Project id already exists!'
    })
  }
  const newProject = {id , title,tasks: []}
  projects.push(newProject)
  return res.json(newProject) 
})

/* 
  Return specific project
*/
routes.get('/projects/:id',checkProjectIdExist,(req,res)=> {
  const { id } = req.params
  const project = findProject(id)
  return res.json(project)
})

/* 
  Update specific project 
*/
routes.put('/projects/:id',checkProjectIdExist,(req,res)=>{
  const {id} = req.params
  const {title} = req.body
  const project = findProject(id)
  project.title= title
  return res.json(project)
  
})

/* 
  Delete project
*/
routes.delete('/projects/:id',checkProjectIdExist,(req,res)=>{
  const { id } = req.params
  const projectIndex = projects.findIndex(project=> project.id==id)
  projects.splice(projectIndex,1)
  return res.send()
})
// ############################ Routes for Tasks ##############################

/* 
  List tasks for a project 
*/
routes.get('/projects/:id/tasks',checkProjectIdExist,(req,res)=>{
  const { id } = req.params
  const project = findProject(id)
  return res.json(project.tasks)
})  

/* 
  Insert new Task in project
*/
routes.post('/projects/:id/tasks',checkProjectIdExist,(req,res)=>{
  const {id} = req.params
  const {title} = req.body
  const project = findProject(id)
  project.tasks.push(title)
  return res.json(project) 
})

module.exports = routes