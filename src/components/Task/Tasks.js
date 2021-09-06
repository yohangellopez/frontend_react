import React, { Component } from 'react'
import * as taskService from './TaskService'
import {toast} from 'react-toastify'

export default class Tasks extends Component{
    state={
        tasks:[],
        "name": "",
        "description": "",
        "id": "",
        "completed": "",
        "search": ""
    }

    confirmDelete = async(id) =>{
        await taskService.deleteTask(id)
        toast.success('The task has been deleted')
        this.componentDidMount();
    }

    async componentDidMount(){
        const data = await taskService.getTasks()
        this.setState({tasks:data})
    }

    editTask= async(id) =>{
        const data = await taskService.getTask(id)
        const {name, description} =data.task
       
        this.setState({
                       name: name,
                       description: description,
                       id : id
                    })
    }
    onSubmit= async(e)=>{
        e.preventDefault();
        var objectTask={
            "name": this.state.name,
            "description": this.state.description
        }  
        if(this.state.id){
            await taskService.updateTask(this.state.id,objectTask)
            toast.info('The task has been modified')
        }else{
            var objectTask={
                "name": this.state.name,
                "description": this.state.description
            }        
            await taskService.createTask(objectTask)
            toast.success('New task added')
        }        
        this.setState({name:"", description:""})
        this.componentDidMount();
    }

    modifyStatus = async(id) =>{
        const data = await taskService.modifyStatus(id);
        toast.success('The task has been completed')
        this.setState({name:"", description:""})
        this.componentDidMount();
    }
 
    onChange= (e) =>{
        this.setState({
            [ e.target.name] :e.target.value}
         )
    }

    onchangeStatus= async(e) =>{
        const data = await taskService.getTasksFilter(e.target.value)
        this.setState({tasks:data})
    }

    onsubmitSearch= async(e) =>{
        const data = await taskService.getTasksFilter(this.state.search)
        this.setState({tasks:data})
        e.preventDefault();
    }

    render() {
        return (
            <div className="row">
        
                <div className="col-md-4 offset-md-4 mx-auto text-center">
                    <div className="card">
                        <div className="card-body">
                            <h3>Create task</h3>
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" className="form-control" value={this.state.name} placeholder="Name" name="name" onChange={this.onChange}/>
                                </div>
                                <div className="form-group">
                                    <textarea type="text" className="form-control" value={this.state.description} rows={3} placeholder="Description" onChange={this.onChange} name="description" ></textarea>
                                </div>
                                <input type="hidden" name="id" value={this.state.id}/>
                                <div className="form-group p-2">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-md-8 text-center">
                <div class="d-flex justify-content-between">
                    <div>
                        <label htmlFor="">Search task: </label>
                        <select onChange={this.onchangeStatus} name="completed" id="">
                            <option value="0">All tasks</option>
                            <option value="1">Completed</option>
                        </select>  
                    </div>
                    <div>
                        <input  type="text" name="search" onChange={this.onChange} value={this.state.search} placeholder="Search a task"/>
                        <button type="submit" onClick={this.onsubmitSearch}>Search</button>
                    </div>
                </div>   
                   <table className="table table-striped">
                        <thead>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Completed</th>
                            <th>Operations</th>
                        </thead>
                        <tbody>
                         {
                             this.state.tasks.map(task=>{
                                 return <tr className="m-2" key={task.id}>
                                 <td>{task.name}</td>
                                 <td>{task.description}</td>
                                 <td>{task.completed ? 'Completed' : 'No completed'}</td>
                                 <td>
                                     <button onClick={() =>this.confirmDelete(task.id)} className="btn btn-danger btn-sm">
                                        <i className="material-icons">delete</i>
                                     </button>
                                     <button onClick={() =>this.editTask(task.id)} className="btn btn-secondary btn-sm">
                                        <i className="material-icons">edit</i>
                                     </button>
                                     {task.completed ? '' : 
                                         <button onClick={() =>this.modifyStatus(task.id)} className="btn btn-secondary btn-sm">
                                                <i className="material-icons">check</i>
                                         </button>
                                    
                                    }
                                 </td>
                                 </tr>
                             })
                         }
                        </tbody>
                   </table>
                </div>
            </div>
        )
    }
}
