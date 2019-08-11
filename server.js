const express = require('express');
const app = express();
const router = require('./app/routes');
app.use(express.static('public'))

app.get('/',function(req,res){
    res.sendFile(require('path').join(__dirname,'./public/assets/html/index.html'));
})


app.use('/api',router);

// Start server on 3000 port
app.listen(3000,function(){
    console.log('Server started..');
})