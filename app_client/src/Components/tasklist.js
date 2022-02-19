import React from 'react'
import axios from 'axios'

class TaskList extends React.Component{
    state = {
        task : "",
        taskList : []
    }

    componentDidMount() {
        this.getTaskList();
    }
    componentDidUpdate() {
        this.getTaskList();
    }

    getTaskList = () => {
        axios.get('http://localhost:4000/tasks')
        .then(response =>  response.data)
        .then(response => this.setState({taskList: response}));
    }

    onDeleteClick = (taskid) => {
        // console.log('inside delete');
        axios.delete(`http://localhost:4000/deleteTask/${taskid}`)
        this.getTaskList();
    }

    onInputChange = (e) => {
        this.setState({
            task: e.target.value
        })
        // console.log(e.target.value);
    }

    onSubmitClick = () => {
        axios.post('http://localhost:4000/addTask', {
            task: this.state.task
        })
        this.getTaskList()
        this.setState({
            task: ""
        })
    }

    onInputKeyPress = (e) => {
        if(e.key == 'Enter'){
            this.onSubmitClick();
        }
    }

    render () {
        return (
            <div>
                {/* <h3>tasklist</h3>
                <div className='ui input'>
                    <input value={this.state.task} onChange={this.onInputChange} onKeyPress={this.onInputKeyPress} placeholder='your task'/>
                </div>
                <button className='ui primary button basic' onClick={() => {
                    this.onSubmitClick()
                }}>Submit</button>
                <hr/>
                <div className="ui cards">
                    {this.state.taskList != "" 
                    ?
                    this.state.taskList.map(task => (
                        <div className="card">
                            <div className="content">
                                <div className="meta">{task.task}</div>
                            </div>
                                <div className="extra content">
                                    <div className="ui two buttons">
                                        <div className="ui basic green button">Done</div>
                                        <div className="ui basic red button" onClick={
                                            () => this.onDeleteClick(task.taskid)}>Delete</div>
                                    </div>
                                </div>
                        </div>
                    ))
                    :
                    <div style={{"margin": "20% auto", "padding": "60px 10px", "font-size": "1.2rem"}} className="card">
                        not connected to the server
                    </div>
                }
                </div> */}
                <section className="vh-100" style={{"background": "#fff"}}>
                  <div className="container py-2 h-100">
                    <div className="row d-flex justify-content-center my-1 h-100">
                      <div className="col col-lg-9 col-xl-12">
                        <div className="card rounded-3">
                          <div className="card-body p-4">
                            
                            <h1 className="text-center my-3 pb-3">TaskList</h1  >
                            
                            <div className="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                              <div className="col-12">
                                <div className="form-outline">
                                  <input className="form-control" value={this.state.task} onChange={this.onInputChange} onKeyPress={this.onInputKeyPress} placeholder='Enter task here' />
                                </div>
                              </div>
                            
                              <div className="col-12">
                                <button className="btn btn-primary" onClick={() => {
                                    this.onSubmitClick()
                                }}>Save</button>
                              </div>
                            </div>
                            
                            <table className="table mb-4">
                              <thead>
                                <tr>
                                  <th scope="col">Todo item</th>
                                  <th scope="col">Status</th>
                                  <th scope="col">Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {this.state.taskList != "" 
                                    ?
                                    this.state.taskList.map(task => (
                                        <tr>
                                            <td>{task.task}</td>
                                            <td>In progress</td>
                                            <td>
                                              <button type="submit" className="btn btn-danger" onClick={
                                                      () => this.onDeleteClick(task.taskid)}>Delete</button>
                                              <button type="submit" className="btn btn-success ms-1">Finished</button>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <div style={{"margin": "20% auto", "padding": "60px 10px", "font-size": "1.2rem"}} className="card">
                                        not connected to the server
                                    </div>
                                }
                              </tbody>
                            </table>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
            </div>
        )
    }
}

export default TaskList;