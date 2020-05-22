const connection = require('../database/connection');

module.exports = {
    async index (request,response){
        const requester = request.headers.authorization; 

        const task = await connection('task')
        .where('requester',requester)
        .select('*');

        return response.json(task)
    }
}