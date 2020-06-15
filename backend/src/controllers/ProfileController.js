const connection = require('../database/connection');

module.exports = {
    async index (request,response){
        const user = request.headers.authorization; 


        const task = await connection('task')
        .select('task.id','task.requester','task.executant','task.description','date','expectation','user.name','urgency.descri as urgency','task.status','status.name as statusName')
        .innerJoin('user','task.requester','=','user.id')
        .innerJoin('urgency','task.urgency','=','urgency.id')
        .innerJoin('status','task.status','=','status.id')
        .where('requester',user)
        .orWhere('task.executant',user)
        return response.json(task)
    }
}