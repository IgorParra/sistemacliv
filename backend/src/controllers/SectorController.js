const connection = require('../database/connection');
module.exports ={
    async create (request,response) {
        const {name}= request.body;
        await connection('sector').insert({name,})
        return response.json();
    },

    async index(request,response){
        const group = await connection('sector').select('*');
        return response.json(group);
    }



}