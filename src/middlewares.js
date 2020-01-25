const { projects } = require('./data')
let count = 0
const logRequests = (req,res,next) => {
  console.log(`
    Time:${Date(Date.now()).toString()} , 
    Method: ${req.method}, Number of Requests: ${count++}
  `)
  return next()
}

const checkProjectIdExist = (req,res,next) => {
  const { id } = req.params
  const project = projects.some(project => project.id ===id)
  project ? next() : res.status(400).json({error: 'Peoject not found'})
}

module.exports = {
  logRequests,
  checkProjectIdExist
}