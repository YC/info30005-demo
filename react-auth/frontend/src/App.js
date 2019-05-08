import React from "react";
import axios from "axios";

const LOGGED_IN = "http://localhost:3000/logged_in";
const LOGIN = "http://localhost:3000/login";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      incorrect: false
    };

    // Initial load, GET request
    axios
      .get(LOGGED_IN, { withCredentials: true })
      .then(response => {
        // Success
        if (response.data.user.id) {
          this.setState({
            id: response.data.user.id,
            isAuthenticated: true
          });
        }
      })
      .catch(err => {
        // Failure
        this.setState({
          isAuthenticated: false
        });
      });

    this.submit = this.submit.bind(this);
  }

  // Set new username
  setUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  // Set new password
  setPassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  // Makes POST request to API
  submit(e) {
    // Prevent submission
    e.preventDefault();

    // Extract new message from state
    const { username, password } = this.state;

    // Login button
    axios
      .post(LOGIN, { username, password }, { withCredentials: true })
      .then(response => {
        // Success
        if (response.data.user.id) {
          this.setState({
            id: response.data.user.id,
            isAuthenticated: true
          });
        }
      })
      .catch(response => {
        this.setState({
          incorrect: true
        });
      });
  }

  render() {
    const { isAuthenticated, incorrect } = this.state;

    if (incorrect) {
      return (
        <div>
          <p>Incorrect username/password or network error</p>
        </div>
      );
    }

    if (isAuthenticated) {
      const { id } = this.state;
      return (
        <div>
          <p>
            User with ID <strong>{id}</strong> authenticated
          </p>
        </div>
      );
    }

    return (
      <div>
        <form
          action=""
          method="POST"
          id="Submit"
          onSubmit={e => this.submit(e)}
        >
          <input
            onChange={e => this.setUsername(e)}
            type="text"
            name="username"
          />
          <input
            onChange={e => this.setPassword(e)}
            type="text"
            name="password"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

export default App;
