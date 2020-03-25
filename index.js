const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Task = require('./models/task');

const app = express();

//view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

//Fetching tasks from db
app.get('/', function(req, res){

    Task.find({}, function(err, tasks){
        if(err){
            console.log('Error in fetching tasks from db');
            return;
        }

        return res.render('home', {
            title : "TODO APP",
            task_list: tasks
        });

    });
});

//creating task
app.post('/create-task', function(req, res){
    Task.create({
        description: req.body.description,
        date: req.body.date,
        category: req.body.category
    }, function(err, newTask){
        if(err){
            console.log("Error in creating task!");
            return;
        }
        console.log('*********', newTask);
        return res.redirect('back');
    });
});

//deleting task
app.get('/delete-task/', function(req, res){
    //get the id from query in the url
    let id = req.query.id;

    //Find the task in the database using id and delete
    Task.findByIdAndDelete(id, function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });
    
});


//Running server
app.listen(port, function(err){
    if(err){
        console.log("Error in running the server", err);
    }
    console.log("Express server is running on Port:", port);
});