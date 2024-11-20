import React, { useState } from 'react'
import { Camera, Image, Video } from 'lucide-react';
import Header from '../components/Header';


const AddBlog = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [media, setMedia] = useState(null);
    const [mediaType, setMediaType] = useState('');
  
    const handleMediaUpload = (event) => {
      const file = event.target.files[0];
      setMedia(file);
      setMediaType(file.type.includes('image') ? 'image' : 'video');
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();

    };

  return (
    <>
    <Header/>
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-4xl p-8 bg-white rounded-lg shadow-md border-b-4 border-black">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="title" className="block mb-2 font-bold">
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
            <label htmlFor="body" className="block mb-2 font-bold">
              Body
            </label>
            <textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={8}
              placeholder="Enter the blog content"
            ></textarea>
          </div>

          <div className="mb-6">
            <label htmlFor="media" className="block mb-2 font-bold">
              {mediaType === 'image' ? 'Image' : 'Video'}
            </label>
            <div className="flex items-center justify-center p-6 border-2 border-gray-300 border-dashed rounded-md">
              {media ? (
                mediaType === 'image' ? (
                  <img
                    src={URL.createObjectURL(media)}
                    alt="Blog Media"
                    className="max-h-64 object-contain"
                  />
                ) : (
                  <video
                    src={URL.createObjectURL(media)}
                    controls
                    className="max-h-64 object-contain"
                  />
                )
              ) : (
                <label htmlFor="media" className="cursor-pointer">
                  {mediaType === 'image' ? (
                    <Camera className="w-8 h-8 mr-2" />
                  ) : (
                    <Video className="w-8 h-8 mr-2" />
                  )}
                  <span>
                    {mediaType === 'image'
                      ? 'Upload an image'
                      : 'Upload a video'}
                  </span>
                </label>
              )}
              <input
                type="file"
                id="media"
                className="hidden"
                onChange={handleMediaUpload}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 font-bold text-white bg-black rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Blog
          </button>
        </form>
      </div>
    </div>
    </>

  )
}

export default AddBlog