import React from "react";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    // Initial load, GET request
    axios.get("http://localhost:3000/api").then(response => {
      this.setState({
        message: response.data.message,
        newMessage: ""
      });
    });

    this.submit = this.submit.bind(this);
  }

  // Sets new message
  setNewMessage(e) {
    this.setState({
      newMessage: e.target.value
    });
  }

  // Makes POST request to API
  submit(e) {
    // Prevent submission
    e.preventDefault();

    // Extract new message from state
    const { newMessage } = this.state;

    // Form data...
    const formData = new FormData();
    formData.append("message", newMessage);

    axios
      .post("http://localhost:3000/api", { message: newMessage })
      .then(response => {
        this.setState({
          message: response.data.message,
          newMessage: ""
        });
      });
  }

  render() {
    const { message } = this.state;

    return (
      <React.Fragment>
        <div>
          <p id="message">{message}</p>
        </div>
        <hr />
        <div>
          <form
            action=""
            method="POST"
            id="Submit"
            onSubmit={e => this.submit(e)}
          >
            <input
              onChange={e => this.setNewMessage(e)}
              id="Input"
              type="text"
              name="message"
            />
            <input type="submit" value="Submit" />
          </form>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
