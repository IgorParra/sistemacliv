const express = require('express');
const routes = express.Router();
const crypto = require('crypto');
const UserController = require('./controllers/UserController.js');
const GroupController = require('./controllers/GroupController.js');
const SectorController = require('./controllers/SectorController.js');
const StatusController = require('./controllers/StatusController.js');
const TaskController = require('./controllers/TaskController');
const ProfileController = require('./controllers/ProfileController');
const SessionsController = require('./controllers/SessionsController');



routes.post('/group',GroupController.create);
routes.get('/group', GroupController.index);

routes.post('/sector',SectorController.create);
routes.get('/sector',SectorController.index);
// routes.delete('/sector', async(request,response)=>{
//     const id = request.body
// })
routes.post('/status', StatusController.create)
routes.get('/status', StatusController.index)

routes.post('/user', UserController.create);
routes.get('/user',UserController.index);

routes.post('/task', TaskController.create)
routes.get('/task', TaskController.index)
routes.delete('/task/:id',TaskController.delete);
routes.put('/task/:id',TaskController.update);

routes.get('/profile',ProfileController.index);

routes.post('/sessions',SessionsController.create)






module.exports = routes;