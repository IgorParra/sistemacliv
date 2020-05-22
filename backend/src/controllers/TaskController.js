const connection = require('../database/connection');

module.exports = {
    async create(request,response){
        const {descri,executant} = request.body;
        const requester = request.headers.authorization;

        const date = new Date().getTime();
        const status = 1;

        const [id] = await connection('task').insert({
            descri,
            executant,
            requester,
            status,
            date
        })

        return response.json({id})
    },

    async index(request,response){
        const {page = 1} = request.query;

        const [count] =  await connection('task').count();


        const task = await connection('task')
           .join('user','user.id', '=','task.requester')
           .limit(5)
           .offset((page-1)*5)
           .select(['task.*','user.name']);

        response.header('X-Total-Count', count['count(*)']);


        return response.json(task);
         
    },

    async delete(request,response){
        const {id} = request.params;
        const requester = request.headers.authorization;
        console.log(requester)
        const task = await connection('task')
          .where('id',id)
          .select('requester')
          .first();

          if(task.requester!=requester){
              return response.status(401).json({error:'Operation Not Permited.'});
          };

          await connection('task').where('id',id).delete();

          return response.status(204).send();
    }

    
}