import React, { useState } from 'react'
import InputField from '../components/InputField';
import { registerUser } from '../services/api/userApi';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const validateInputFields = (id,value) => {
    switch (id) {
        case "username":
            if (!/^[A-Za-z]+$/.test(value)) {
            return "Name should contain only alphabets.";
            }
            break;
        case "email":
            if (!/\S+@\S+\.\S+/.test(value)) {
            return "Invalid email format.";
            }
            break;
        case "password":
            if (!/^\S{8,17}$/.test(value)) {
            return "Password should be 8-17 characters and should not include spaces.";
            }
            break;
        case "confirm_password":
            if (value !== password) {
            return "Passwords do not match.";
            }
            break;
        default:
            return "";
        }
        return "";
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log({ username, email, password, confirmPassword });
        const errors = [];
    
        errors.push(validateInputFields("username", username));
        errors.push(validateInputFields("email", email));
        errors.push(validateInputFields("password", password));
        errors.push(validateInputFields("confirm_password", confirmPassword));

        const filteredErrors = errors.filter(error => error !== "");

        if (filteredErrors.length > 0) {
            filteredErrors.forEach((error) => {
                toast.error(error); 
            });
            return; 
        }
        const userData = {
            username,
            email,
            password,
            confirm_password: confirmPassword
        }
        if (errors.filter(error => error !== "").length === 0){
            try{
                const handleRegister = await registerUser(userData);
                console.log('handleRegister',handleRegister)
                if (handleRegister){
                    toast.success('User Registered successfully.')
                    navigate('/login')
                }
            }catch (error){
                console.log(error);
                toast.error(error.message)
            }
        }
    };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-center mb-6">Register</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <InputField
                    label="User Name"
                    id="username"
                    type="text"
                    placeholder="Enter your full name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
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
                    className="w-full bg-black text-white py-2 px-4 rounded-md "
                >
                    Register
                </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-4">
                Already have an account?{" "}
                <a href="/login" className="text-black font-medium hover:underline">
                    Login
                </a>
            </p>
        </div>
    </div>

  )
}

export default Register