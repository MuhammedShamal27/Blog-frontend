import React, { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import Header from "../components/Header";
import { ProfileData, UserLogout } from "../services/api/userApi";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Profile = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await ProfileData();
        setUserProfile(response.data);
      } catch (err) {
        setError(err.message || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await UserLogout();
      console.log(response);
      if (response) {
        localStorage.removeItem('token')
        localStorage.removeItem('refresh_token')
        console.log(response);
        toast.success("Logout Successful");
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong.");
    }
  };

  console.log(userProfile)
  const handleEditProfile = () => {
    navigate("/edit-profile", { state: { userProfile } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header />
      <div className="w-full max-w-2xl mx-auto p-8">
        <div className="border border-gray-200 p-8 bg-white">
          <div className="flex flex-col items-center mb-8">
            <div className="w-32 h-32 mb-4 relative">
              <img
                src={userProfile.profile_picture || "https://banner2.cleanpng.com/20180404/sqe/avhxkafxo.webp"}
                alt="Profile"
                className="rounded-full w-full h-full object-cover border-2 border-gray-200"
              />
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <div className="border-b border-gray-200 pb-2">
              <label className="text-sm text-gray-600">Username</label>
              <div className="text-lg">{userProfile.username || "N/A"}</div>
            </div>

            <div className="border-b border-gray-200 pb-2">
              <label className="text-sm text-gray-600">Email</label>
              <div className="text-lg">{userProfile.email || "N/A"}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleEditProfile}
              className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition-colors"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="px-6 py-2 border border-black text-black rounded-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
