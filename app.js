const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const model = require('./models/curd');


app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb+srv://Xdlotera1:1122334455@hello-hey.gf6iy.mongodb.net/test');

app.get('/', function(req, res) {
    res.render('show');
})


app.get('/add', function(req, res){
    const data = new model({
        age: req.body.age,
        name : req.body.name,
        rollNumber:req.body.rollNumber
    });
    data.save()
        .then((response) =>{
            res.send(response);
        })
        .catch((err) =>{
            res.send(err);
        })
});

app.get('/show', function(req, res){
    model.find()
        .then((response) =>{
            res.send(response);
        })
        .catch((err) =>{
            res.send(err);
        })

});

app.get('/sort', function(req, res){
    model.find().sort({age:-1})
        .then((response) =>{
            res.send(response);
        })
        .catch((err) =>{
            res.send(err);
        })

})

app.listen(3000);