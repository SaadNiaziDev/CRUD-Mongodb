const express = require('express')
var router = express.Router();
const Student = require('../../models/Student')

router.post('/add', function(req, res){
    const obj = new Student({
        age: req.body.age,
        name: req.body.name,
        rollNumber: req.body.rollNumber,
        section:req.body.section,
        session:req.body.session,
        school:req.body.school
    });
    obj.save()
        .then((response) =>{
            res.send(response);
        })
        .catch((err) =>{
            res.send(err);
        })
});

router.get('/show', function(req, res){
    Student.find()
        .then((response) =>{
            res.send(response);
        })
        .catch((err) =>{
            res.send(err);
        })
});

router.get('/sort', function(req, res){
    Student.find().sort({age:-1})
        .then((response) =>{
            res.send(response);
        })
        .catch((err) =>{
            res.send(err);
        })

});

router.delete('/delete', function(req, res){
    Student.removeMany({})
        .then((response) =>{
            res.send(response);
        })
        .catch((err) =>{
            res.send(err);
        })

});

router.put('/replace', function(req, res){
    Student.findOneAndUpdate({name:'usman'},{name:req.body.name,age:req.body.age},(err,data)=>{
        if(!err && data){
            res.send(data);
        }
        else{
            console.log('Error');
        }
})
});

router.put('/updateMany', function(req, res){
    Student.updateMany({age:{$gt:"20"}},{$set:{age:'00'}},(err, data) => {
        if(!err && data){
            res.send(data);
        }
        else{
            console.log('Error');
        }
    })
});


router.put('/find', (req, res) => {
    Student.findById(req.query.id,(err, data)=>{
        if(!err && data){
            res.send(data);
            console.log("Hello")
        }
        else{
            console.log('Error');
        }
    })
});




// router.put('/subobj',(req, res)=>{
//     Student.findOneAndUpdate({"name":"ibrar"},{$set:{details:req.body.name}})
//     .populate('details')
//     .exec(function (err, data) {
//             if (!err) {
//                 console.log(data);
//                 res.send(data);
//             } else {
//                 console.log("failed to retreve!");
//             }

//         })
// })

module.exports = router;