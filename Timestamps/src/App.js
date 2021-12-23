import React, { Component } from 'react';
import './App.css';
import MyForm from './MyForm.js';
class App extends Component {
  state = {
    data: null,
    d1: null,
    d2: null,
    diff: null,
    total_diff: null
  };

  componentDidMount() {
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express, d1: res.date1, d2: res.date2, diff: res.t_diff, total_diff: res.total_diff }))
      .catch(err => console.log(err));
  }
  // fetching the POST route from the Express server to get the time
  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message)
    }
    return body;
  };

  render() {
    var times = "";
   
    if (this.state.d1 && this.state.d2) {
      times = <div className='time'>
        <hr />
        <span>Time 1 : </span>{this.state.d1}
        <br />
        
        <span>Time 2 : </span>{this.state.d2}
        <br />
        <span>Difference in given time stamps =</span> {this.state.diff} second(s)
        <br />
        <span>Days/Hours/Minutes Difference = </span>{this.state.total_diff}
        <br />
        <br />
        Note: Minus (-) means the second time stamp provided was greater than the first one.
      </div>
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Time-Stamps Calculation</h1>
        </header>
        <MyForm />
        
        <p className="App-data">{times}</p>
        <br />
      </div>
    );
  }
}

export default App;