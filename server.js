/* GET: Retrieve all Tasks
GET: Retrieve a Task by ID
POST: Create a Task
PUT: Update a Task by ID
DELETE: Delete a Task by ID 
	app.get("/widgets", (req, res) => {

})
*/
const express = require("express");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tasks', { useNewUrlParser: true });
app.set('view engine', 'ejs');
app.use(express.static( __dirname+'/public/dist/public'));
app.use(express.urlencoded({ extended: true }));
//app.use(express.json());

const TaskSchema = new mongoose.Schema({
    title: { type: String, required: true},
    description: { type: String, defaultll: " " },
    completed: { type: Boolean, default: false },
}, {timestamps:true});
mongoose.model('Task', TaskSchema)
const Task = mongoose.model('Task')

//get all tasks
app.get('/tasks', (req,res) => {
    Task.find() 
    .then(data => res.json(data))
    .catch(err => res.json(err));
  });
//get spesfic task
app.get('/task/:id', (req, res) => {
    var task= Task.find({ _id: req.params.id }, function (err, task) {
        if (err) {
            console.log("error", err);
            res.json(err)
        } else {
            res.json(task)
        }
    })
})
//add task
app.post('/add', (req, res) => {
    var task = new Task(req.body)
    task.save(function (err, task) {
        if (err) {
            console.log("error", err);
            res.json(err);
             
        } else {
            res.json(task)
        }
    })
})
//update task
app.put('/update/:id', (req, res) => {
    var task = Task.updateOne({ _id : req.params.id }, {title: req.body.title, description : req.body.description, completed : req.body.completed}, function (err, task) {
        if (err) {
            console.log("error", err);
            res.json(err)
        } else {
            res.json(task)
        }
    })

})
//delete task
app.delete('/delete/:id', (req, res) => {
    Task.remove({ _id: req.params.id }, function (err, task) {
        if (err) {
            console.log("error", err);
            res.json(err)
        } else {
            res.json(task)
        }
    })
})
app.listen(4200, () => console.log("listening on port 4200"))