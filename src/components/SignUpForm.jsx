import React from "react";
import { useState } from 'react';

const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

function SignUpForm() {
    return <>
    <h2>Sign Up!</h2>; 
    
    <form>
        <label>
            Username: <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
            Password: <input value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button>Submit</button>
    </form>
    </>
}

export default SignUpForm