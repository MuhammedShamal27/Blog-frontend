import React, { useEffect, useState } from 'react'
import InputField from '../components/InputField'
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { LoginUser } from '../services/api/userApi';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/", { replace: true }); 
        }
    }, [navigate]);


    const validateInputFields = (id,value) => {
        switch (id) {
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
            default:
                return "";
            }
            return "";
        }


    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log({ email, password });
        const errors = [];
    
        errors.push(validateInputFields("email", email));
        errors.push(validateInputFields("password", password));

        const filteredErrors = errors.filter(error => error !== "");

        if (filteredErrors.length > 0) {
            filteredErrors.forEach((error) => {
                toast.error(error); 
            });
            return; 
        }
        const userData = {
            email,
            password,
        }
        if(errors.filter(error => error !== "").length === 0){
            try{
                console.log('login user',userData)
                const response = await LoginUser(userData);
                if (response){

                    localStorage.setItem("token", response.data.access_token);
                    localStorage.setItem("refresh_token", response.data.refresh_token);
                    toast.success(response.data.message)
                    navigate('/',{ replace: true })
                }
            }catch(error){
                console.log('error',error)
                toast.error(error.response?.data?.message ||"Something went wrong.")
            }
        }
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
                    className="w-full bg-black text-white py-2 px-4 rounded-md"
                >
                    Login
                </button>
            </form>
            <p className="text-sm text-gray-600 text-center mt-4">
                Don't have an account?{" "}
                <a href="/register" className="text-black font-medium hover:underline">
                    Register
                </a>
            </p>
        </div>
    </div>

)
}

export default Login