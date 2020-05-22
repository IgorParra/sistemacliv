const connection = require('../database/connection');
module.exports = {

    async create (request,response) {
        const {name} = request.body; 
        await connection('group').insert({name,})
        return response.json();
    },

    async index (request,response){
        const group = await connection('group').select('*');
        return response.json(group);
    }


}