const router = require('express').Router();
const outlet_helper = require('./../controllers/outlet');


router.get('/ping',function(req,res){
    res.send('Pong')
});

router.get('/get_nearest_outlet',outlet_helper.get_nearest_outlet);

module.exports = router;