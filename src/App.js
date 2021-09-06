import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {ToastContainer} from 'react-toastify'
// Componentes
import Navbar from './components/Navbar/Navbar';
import TaskForm from './components/Task/TaskForm';
import Tasks from './components/Task/Tasks';

class App extends Component{

  render(){
    return <div>
      <Router>
        <Navbar />
        <div className="container p-4">
          <Route exact path="/new-task" render={() => <TaskForm  />} /> 
          <Route exact path="/tasks" component={Tasks} />
          <ToastContainer />
        </div>
      </Router>
  </div>
  }
}

export default App;
