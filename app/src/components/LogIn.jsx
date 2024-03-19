import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LogIn = ({ auth, onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const login = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            onLogin(user); // Call the onLogin callback to update the state in App.jsx
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error(errorCode, errorMessage);
        }
    };

    return (
        <div className='centered-layout'>
            <input type="text"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
            />
            <input type="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder="Password"
            />
            <button onClick={login}>Log In</button>
        </div>
    );
};

export default LogIn;


// const login = async () => {
//     try {
//         const userCredential = await signInWithEmailAndPassword(auth, email, password);
//         const token =  await userCredential.user.getIdToken()
//         console.log(token);
//     } catch (error) {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         console.error(errorCode, errorMessage);
//     }
// };
