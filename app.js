const express = require('express');
const app = express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const model = require('./models/curd');


app.use(express.json());
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost:27017/test');

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

});




app.delete('/delete', function(req, res){
    model.deleteOne({name:req.body.name})
        .then((response) =>{
            res.send(response);
        })
        .catch((err) =>{
            res.send(err);
        })

});

app.put('/replace', function(req, res){
    model.findOne({name:req.body.name},(err, data)=>{
        if(!err && data){
            data.age=req.body.age;
            console.log(data, req.body.age)
            data.save((err, data) => {
                res.send("oks");
            });
        }
        else{
            res.send("not found!");
        }
    })

})



app.listen(3000);