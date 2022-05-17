const express = require('express');
const app = express();
var cors = require('cors')
const mongoose = require('mongoose');
const Routes = require('./routes')
const bodyParser = require('body-parser');
let httpResponse = require("express-http-response");



require('./models/Student');
require('./models/User')
mongoose.connect('mongodb://localhost:27017/LMS?retryWrites=false',(err)=>{
    if(err){
        console.log(err)
    }else{
    console.log("Connected to mongoDB!");
    }
});
mongoose.set('debug', true);
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
app.use(Routes);
app.use(bodyParser.json());
app.use(httpResponse.Middleware)



app.get('/', function(req, res) {
    res.send("hello");
})

app.listen(4000);