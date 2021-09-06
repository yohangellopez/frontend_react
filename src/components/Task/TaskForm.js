import React, {Component, } from 'react'
import * as taskService from './TaskService'
import {toast} from 'react-toastify'

export default class TaskForm extends Component{

    
    state ={
        "name": "",
        "description": ""
    }

    onSubmit= async(e)=>{
        e.preventDefault();
        await taskService.createTask(this.state)
        toast.success('New task added')
        this.setState({name:"", description:""})
    }
 
    onChange= (e) =>{
        this.setState({
           [ e.target.name] :e.target.value
        })
    }
    render(){

        return(
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
                                <div className="form-group p-2">
                                    <button type="submit" className="btn btn-primary">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}