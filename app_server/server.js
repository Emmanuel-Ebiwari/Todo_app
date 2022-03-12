const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();

const PORT = 4000;

app.use(cors());
app.use(bodyParser.json())

app.get('/tasks', (req, res) => {
    const TASK_QUERY = `SELECT * FROM todo_database.tasks ORDER BY taskid;`
    connection.query(TASK_QUERY, (err, response) => {
        if(err) console.log(err)
        else res.send(response)
    })
})

app.post('/addTask', (req, res) => {
    const ADD_QUERY = `INSERT INTO todo_database.tasks (task) VALUES ('${req.body.task}');`
    connection.query(ADD_QUERY, err => {
        if(err) console.log(err)
        else res.send('task has been successfully added')
    })
})

app.delete('/deleteTask/:taskid', (req, res) => {
    console.log(req.params.taskid);
    const DELETE_QUERY = `DELETE FROM todo_database.tasks WHERE (taskid=${req.params.taskid});`
    connection.query(DELETE_QUERY, (err, response) => {
        if(err) console.log(err)
        else res.send('you can delete tasks')
    })
})

app.post('/finishedTask/:taskid', (req, res) => {
    console.log(req.params.taskid);
    console.log(req.body.isFinished);
    const ALTER_QUERY = `UPDATE tasks SET isFinished="${req.body.isFinished !== "In progress" ? "completed" : "In progress"}" WHERE (taskid=${req.params.taskid});`
    connection.query(ALTER_QUERY, (err, response) => {
        if(err) console.log(err)
        else res.send('your task has been updated')
    })
})

app.get('/finishedTask/:taskid', (req, res) => {
    const RETRIEVE_QUERY = `SELECT taskid, isFinished FROM todo_database.tasks ORDER BY taskid;`
    connection.query(RETRIEVE_QUERY, (err, response) => {
        if(err) console.log(err)
        else res.send(response)
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})