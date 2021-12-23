import React from 'react'

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      time1: new Date(),
      time2: new Date() };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    
    fetch('http://localhost:5000/store-data', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      // We convert the React state to JSON and send it as the POST body
      // body: JSON.stringify("bye")
      body: JSON.stringify(this.state)
    }).then(function (response) {
      // console.log(response)
      return response.json();
    }).then((result) => {
      console.log(result);
    });

    // event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} encType='multipart/form-data'>
        <label>
          Time1:
          <input type="datetime-local" value={this.state.time1} required name="time1" onChange={this.handleChange} />
        </label>
        <br />
        <br />
        <label>
          Time2:
          <input type="datetime-local" value={this.state.time2} required name="time2" onChange={this.handleChange} />
        </label>
        <br />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default MyForm;