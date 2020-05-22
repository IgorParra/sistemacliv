const connection = require('../database/connection');

module.exports = {
    async index (request,response){
        const group = await connection('sector').select('*');
        return response.json(group);
    },

    async create(request,response) {
        const status = await connection('status').select('*');
        return response.json(status);
    }


}