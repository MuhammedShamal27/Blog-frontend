import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { UserHome, UserLogout } from "../services/api/userApi";
import { Plus, Search, LogOut, CircleUserRound, Edit, FileText, Logs } from 'lucide-react';
import { toast } from "sonner";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfilePicture, setIsProfilePicture] = useState(false);
  const [user, setUser] = useState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await UserHome();
        setUser(currentUser);
        setIsProfilePicture(currentUser.data.profile_picture);
        setIsLoggedIn(true);
      } catch (error) {
        console.log('User is not logged in.');
        setIsLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await UserLogout();
      if (response) {
        console.log(response);
        toast.success("Logout Successful");
        navigate('/login');
        setIsLoggedIn(false);
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  const handleBlog = () => {
    navigate('/new-blog');
  };
  
  const handleBlogList = () => {
    navigate('/blog-listing');
  };

  const handleEditProfile = () => {
    navigate('/edit-profile');
  };

  const handleLogin = () => {
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/');
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);  
  };

  return (
    <>
      {isLoggedIn ? (
        <header className="flex justify-between items-center p-4 bg-white shadow-md border-b">
          <div className="text-2xl font-bold cursor-pointer" onClick={handleHome}>THE BLOG</div>
          <div className="flex items-center space-x-4">
            <Search />
            <div className="relative">
              {/* Profile Picture or Icon */}
              <div className="cursor-pointer" onClick={toggleDropdown}>
                {isProfilePicture ? (
                  <img src={user?.profile_picture || ""} alt="profile" className="h-8 w-8 rounded-full" />
                ) : (
                  <CircleUserRound className="w-8 h-8" />
                )}
              </div>
              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
                  <div className="p-2">
                    <button
                      onClick={handleBlog}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 rounded-md"
                    >
                      <FileText className="w-5 h-5" />
                      <span>Add Blog</span>
                    </button>
                    <button
                      onClick={handleBlogList}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 rounded-md"
                    >
                      <Logs className="w-5 h-5" />
                      <span>My Blogs</span>
                    </button>
                    <button
                      onClick={handleEditProfile}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 rounded-md"
                    >
                      <Edit className="w-5 h-5" />
                      <span>Edit Profile</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center space-x-2 px-4 py-2 hover:bg-gray-200 rounded-md"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>
      ) : (
        <header className="flex justify-between items-center px-6 py-4 bg-[#FFF9F5] border-b border-black">
          <div className="text-2xl font-bold">THE BLOG</div>
          <div className="flex items-center gap-6">
            <button onClick={handleLogin} className="text-sm hover:text-gray-600">Get started</button>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
