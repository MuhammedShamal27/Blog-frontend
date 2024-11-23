import React, { useState } from "react";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { UpdateProfile } from "../services/api/userApi";

const EditProfile = () => {
  const location = useLocation();
  const userData = location.state?.userProfile;

  const [formData, setFormData] = useState({
    username: userData?.username || "",
    email: userData?.email || "",
    profile_picture: userData?.profile_picture || "",
  });
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(userData?.profile_picture || "");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "ml_default");

      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkyoex8dr/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();

      if (data.secure_url) {
        setFormData((prev) => ({
          ...prev,
          profile_picture: data.secure_url,
        }));
        setPreviewUrl(data.secure_url);
      } else {
        toast.error("Failed to upload image.");
      }
    } catch (error) {
      toast.error("Error uploading image.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const response = await UpdateProfile(userData.id, formData);
      if (response?.status === "success") {
        toast.success("Profile updated successfully!");
        navigate("/profile");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile.");
    }
  };

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl font-bold text-center">Edit Profile</h1>
          <form className="space-y-8" onSubmit={handleSave}>
            {/* Profile Picture */}
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
                    {isUploading ? (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="loader animate-spin" />
                      </div>
                    ) : (
                      <img
                        src={previewUrl}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <label
                    htmlFor="profile_picture"
                    className="absolute bottom-0 right-0 p-2 bg-black rounded-full text-white cursor-pointer hover:bg-gray-800 transition-colors"
                  >
                    Upload
                    <input
                      type="file"
                      id="profile_picture"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Username */}
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter username"
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                placeholder="Enter email"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={() => navigate("/profile")}
                className="flex-1 border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
