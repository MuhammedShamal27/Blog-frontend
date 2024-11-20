import React, { useState } from 'react'
import InputField from '../components/InputField';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password, confirmPassword }); 
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="Full Name"
                    id="username"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <InputField
                    label="Email Address"
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <InputField
                    label="Confirm Password"
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Register
                </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-purple-600 font-medium hover:underline">
                    Login
                </a>
            </p>
        </div>
    </div>

  )
}

export default Register