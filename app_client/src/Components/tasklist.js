import React from 'react'
import axios from 'axios'

class TaskList extends React.Component{
    state = {
        task : "",
        taskList : []
    }

    componentDidMount() {
        this.getTaskList();
        // this.getProgressList();
    }
    componentDidUpdate() {
        this.getTaskList();
        // this.getProgressList();
    }

    getTaskList = () => {
        axios.get('http://localhost:4000/tasks')
        .then(response =>  response.data)
        .then(response => this.setState({taskList: response}));
    }

  //   getProgressList = (taskid) => {
  //     axios.get(`http://localhost:4000/finishedTask/${taskid}`)
  //     .then(response => console.log(response.data))
  //     .then(response => this.setState({progList: response}));
  // }
      getProgressList = (taskid) => {
      axios.get(`http://localhost:4000/finishedTask/${taskid}`)
      .then(response => response.data)
      .then(response => {
        response.forEach(res => {
          if (taskid === res.taskid && res.isFinished === "In progress"){
            // console.log(taskid, "1st", res.taskid, "2nd",  res.isFinished, "3rd");
            axios.post(`http://localhost:4000/finishedTask/${taskid}`, {
                isFinished: "completed"
            })
          }
          else if(taskid === res.taskid &&  res.isFinished === "completed"){
            // console.log(taskid, "1st", res.taskid, "2nd",  res.isFinished, "3rd");
            axios.post(`http://localhost:4000/finishedTask/${taskid}`, {
              isFinished: "In progress"
            })
          }
        });
      });
    }

    onDeleteClick = (taskid) => {
        // console.log('inside delete');
        axios.delete(`http://localhost:4000/deleteTask/${taskid}`)
        this.getTaskList();
    }
    onFinishedClick = (taskid) => {
      // if (this.state.isFinished == false){
      //         this.setState({
      //           isFinished: true
      //         })
      //         axios.post(`http://localhost:4000/finishedTask/${taskid}`, {
      //           isFinished: this.state.isFinished
      //       })
      // }
      // else{
      //         this.setState({
      //           isFinished: false
      //         })
      //         axios.post(`http://localhost:4000/finishedTask/${taskid}`, {
      //           isFinished: this.state.isFinished
      //       })
      // }
      this.getTaskList(taskid);
      // console.log(taskid);
      this.getProgressList(taskid);
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
        if(e.key === 'Enter'){
            this.onSubmitClick();
        }
    }

    render () {
        return (
            <div>
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
                                }}>Add Task</button>
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
                                <div className='p-2'></div>
                                {this.state.taskList != ""
                                    ?
                                    this.state.taskList.map(task => (
                                        <tr>
                                            <td className='text-left text-capitalize' style={task.isFinished === "completed" ? {textDecoration:"line-through"}: {textDecoration:"initial"}}>{task.task}</td>
                                            <td>{task.isFinished}</td>
                                            <td>
                                              <button type="submit" className="btn btn-danger" onClick={
                                                      () => this.onDeleteClick(task.taskid)}>Delete</button>
                                              <button type="submit" className="btn btn-success ms-1" onClick={
                                                      () => this.onFinishedClick(task.taskid)}>Finished</button>
                                            </td>
                                        </tr>
                                    ))
                                    :
                                    <div style={{ "font-size": "1.2rem", "margin-left": "50%"}} className="card py-5 px-1 my-5">
                                        not connected to the server or list empty
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