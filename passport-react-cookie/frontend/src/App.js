import { useState, useEffect } from 'react';
import axios from 'axios';

const LOGGED_IN = 'http://localhost:3000/logged_in';
const LOGIN = 'http://localhost:3000/login';

function App() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [load, setLoad] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [incorrect, setIncorrect] = useState(false);
    const [id, setId] = useState(-1);

    useEffect(() => {
        if (!load) {
            setLoad(true);

            axios
                .get(LOGGED_IN, { withCredentials: true })
                .then((response) => {
                    // Success
                    if (response.data.id) {
                        setAuthenticated(true);
                        setId(response.data.id);
                    }
                })
                .catch((err) => {
                    // Failure
                    setAuthenticated(false);
                });
        }
    }, [load]);

    // Makes POST request to API
    function submit(e) {
        // Prevent submission
        e.preventDefault();

        // Login button
        axios
            .post(LOGIN, { username, password }, { withCredentials: true })
            .then((response) => {
                // Success
                console.log(response);
                if (response.data.id) {
                    setAuthenticated(true);
                    setId(response.data.id);
                }
            })
            .catch((response) => {
                console.log(response);
                setIncorrect(true);
            });
    }

    // Incorrect page
    if (incorrect) {
        return (
            <div>
                <p>Incorrect username/password or network error</p>
            </div>
        );
    }
    // User is authenticated
    if (authenticated) {
        return (
            <div>
                <p>
                    User with ID <strong>{id}</strong> authenticated
                </p>
            </div>
        );
    }
    // Login
    return (
        <div>
            <form action="" method="POST" id="Submit" onSubmit={submit}>
                <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    name="username"
                />
                <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="text"
                    name="password"
                />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default App;
