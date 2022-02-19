const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');

const app = express();

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

app.listen(4000, () => {
    console.log('running on port 4000');
})