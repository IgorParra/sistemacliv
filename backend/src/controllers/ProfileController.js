const connection = require('../database/connection');

module.exports = {
    async index (request,response){
        const requester = request.headers.authorization; 

        const task = await connection('task')
        .select('task.id','task.descri','date','expectation','user.name','urgency.descri as urgencia')
        .innerJoin('user','task.requester','=','user.id')
        .innerJoin('urgency','task.urgency','=','urgency.id')
        .where('requester',requester)
      

        return response.json(task)
    }
}