const express = require('express');
const app = express();
const router = require('./app/routes');


// app.get('/',function(req,res){
//     res.sendFile(require('path').join(__dirname,'./assets/html/index.html'));
// })


app.use('/api',router);

// Start server on 3000 port
app.listen(3000,function(){
    console.log('Server started..');
})