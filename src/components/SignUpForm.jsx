import {useState} from "react";


function SignUpForm({setToken}) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [validationError, setValidationError] = useState(null);

    async function handleSubmit(event) {
        event.preventDefault();

        if (username.length < 8) {
            setValidationError('Username must be 8 characters long.');
            return;
        }

        if (password.length <8) {
            setValidationError('Password must be 8 characters long');
            return;
        }

        setValidationError(null);

        try {
            const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
            });
            const result = await response.json();
            console.log('Form submitted', result);

            // Set token received from API reponse
            setToken(result.token);

            // Clears the form and error state when submission is a success
            setUsername("");
            setPassword("");
            setError(null);
        } catch (error) {
            setError(error.message);
        }
    }
    
    return (
        <>
            <h2>Sign Up!</h2>;
            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    />
                </label>
                <label>
                    Password:
                    <input
                    type="password"
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    />
                </label>
                <button>Submit</button>
            </form>
            {validationError && <p>{validationError}</p>}
            {error && <p> Error: {error}</p>}
        </>
    )   
}

export default SignUpForm;