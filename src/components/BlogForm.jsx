import React, { useState } from "react";
import { Camera, X } from 'lucide-react';
import { toast } from 'sonner';

const BlogForm = ({ apiFunction, initialData = {}, buttonLabel = "Submit"  }) => {

  const [title, setTitle] = useState(initialData.title || "");
  const [description, setDescription] = useState(initialData.description || "");
  const [media, setMedia] = useState(initialData.media || []);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ml_default");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dkyoex8dr/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error("Error uploading to Cloudinary:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || media.length === 0) {
      toast.error("Please fill in all fields and upload media.");
      return;
    }

    try {
      const mediaUrls = [];
      for (const file of media) {
        const url = await uploadToCloudinary(file);
        console.log(url);
        if (url) mediaUrls.push(url);
      }
      console.log(mediaUrls);
      const payload = {
        title,
        description,
        media: mediaUrls,
      };
      console.log(payload);
      const response = await apiFunction(payload);

      if (response) {
        console.log(response);
        toast.success(response.message || "Blog added successfully");
      }
    } catch (error) {
        console.error(error);
        toast.error("Something went wrong.");
    }
  };

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    const newFiles = files.filter(
      (file) => !media.some((m) => m.name === file.name && m.lastModified === file.lastModified)
    );
    if (media.length + newFiles.length > 5) {
      toast.error("You can upload up to 5 files.");
      return;
    }
    setMedia([...media, ...newFiles]);
  };

  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="title" className="block mb-2 font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter the blog title"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="body" className="block mb-2 font-medium">
          Body
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={8}
          placeholder="Enter the blog content"
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-medium">Media</label>
        {/* Preview Section */}
        <div className="mb-4 flex flex-wrap gap-4">
          {media.map((file, index) => (
            <div
              key={index}
              className="relative w-16 h-16 border rounded-lg overflow-hidden"
            >
              {file.type.includes("image") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={URL.createObjectURL(file)}
                  className="w-full h-full object-cover"
                  controls
                />
              )}
              <button
                type="button"
                onClick={() => removeMedia(index)}
                className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Upload Section */}
        {media.length < 5 && (
          <div className="flex items-center justify-center p-4 border-2 border-gray-300 border-dashed rounded-md hover:border-gray-400 transition-colors">
            <label
              htmlFor="media"
              className="cursor-pointer flex items-center space-x-2"
            >
              <Camera className="w-6 h-6" />
              <span className="text-sm ml-2">Upload media</span>
            </label>
            <input
              type="file"
              id="media"
              accept="image/*,video/*"
              className="hidden"
              onChange={handleMediaUpload}
              multiple
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-bold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {buttonLabel}
      </button>
    </form>
  );
};

export default BlogForm;
