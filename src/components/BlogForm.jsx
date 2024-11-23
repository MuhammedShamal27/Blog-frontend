import React, { useState, useEffect } from "react";
import { Camera, X, Plus } from "lucide-react";
import { toast } from "sonner";

const BlogForm = ({ apiFunction, initialData ={}, buttonLabel = "Submit" }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");


  useEffect(() => {
    setTitle(initialData.title || "");
    setDescription(initialData.description || "");
    setMedia(initialData.media || []);
    setTags(initialData.tags || []);
  }, []);

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
    if (!title || !description) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const mediaUrls = [];
      for (const file of media) {
        if (file instanceof File) {
          const url = await uploadToCloudinary(file);
          if (url) mediaUrls.push(url);
        } else {
          mediaUrls.push(file); // Already uploaded URLs remain unchanged
        }
      }

      const payload = {
        title,
        description,
        media: mediaUrls,
        tags,
      };

      await apiFunction(payload);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const handleMediaUpload = (event) => {
    const files = Array.from(event.target.files);
    setMedia([...media, ...files]);
  };

  const removeMedia = (index) => {
    setMedia(media.filter((_, i) => i !== index));
  };

  const addTag = () => {
    if (!tagInput.trim()) {
      toast.error("Tag cannot be empty.");
      return;
    }
    if (tags.includes(tagInput.trim())) {
      toast.error("Tag already exists.");
      return;
    }
    setTags([...tags, tagInput.trim()]);
    setTagInput("");
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
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
        <div className="mb-4 flex flex-wrap gap-4">
          {media.map((file, index) => (
            <div
              key={index}
              className="relative w-16 h-16 border rounded-lg overflow-hidden"
            >
              {typeof file === "string" ? (
                <img
                  src={file}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  className="w-full h-full object-cover"
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

      <div className="mb-6">
        <label htmlFor="tags" className="block mb-2 font-medium">
          Tags
        </label>
        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a tag"
          />
          <button
            type="button"
            onClick={addTag}
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <div
              key={index}
              className="flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
            >
              <span>{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="ml-2 text-red-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
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
