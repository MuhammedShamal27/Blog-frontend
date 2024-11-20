import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom'
import { UserHome } from "../services/api/userApi";
import profile from '../assets/profile.jpg'
import {Plus, Search} from 'lucide-react'

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const navigate = useNavigate()
  
  useEffect(()=> {
    const fetchUser = async ()=>{
      try{
        const currentUser = await UserHome();
        setUser(currentUser)
        setIsLoggedIn(true);
      }catch(error){
        console.log('User is not logged in.')
        setIsLoggedIn(false);
      }
    }
    fetchUser();
  },[])

  const handleLogin = ()=>{
    navigate('/login')
  }


  return (
    <>
      {isLoggedIn ? (
      <header className="flex justify-between items-center p-4 bg-white shadow-md border-b">
          <div className="text-2xl font-bold">THE BLOG</div>
          <div className="flex justify-between items-center space-x-4">
            <Plus />
            <Search />
            <img src={profile} alt="profile" className="h-8 w-8 rounded-full" />
          </div>
      </header>
      ) : (
      <header className="flex justify-between items-center px-6 py-4 bg-[#FFF9F5] border-b border-black">
        <div className="text-2xl font-bold">THE BLOG</div>
        <div className="flex items-center gap-6">
          <button onClick={handleLogin} className="text-sm hover:text-gray-600">Get started</button>
        </div>
      </header>
      )
      }
    </>
  );
};

export default Header;
