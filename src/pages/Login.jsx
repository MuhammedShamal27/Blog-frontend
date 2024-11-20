import React, { useState } from 'react'
import InputField from '../components/InputField'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ email, password }); 
    };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <button
                    type="submit"
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    Login
                </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-4">
                Don't have an account?{" "}
                <a href="/register" className="text-purple-600 font-medium hover:underline">
                    Register
                </a>
            </p>
        </div>
    </div>

)
}

export default Login