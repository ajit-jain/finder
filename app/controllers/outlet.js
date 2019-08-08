const location_helper = require('./../helpers/location');
module.exports = {
    get_nearest_outlet
}


/*
Retrieves the nearest store for the lat and long value provided in query params
*/
async function get_nearest_outlet(req,res){
    try{
        let {lat,long} = req.query;
        let name = await location_helper.get_location_name(long,lat);
        res.status(200).send({outlet:{name}});
    }catch(e){
        res.status(400).send({message:e.message || 'Something went wrong'})
    }
}