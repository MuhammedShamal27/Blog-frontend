import React from 'react';
import Header from '../components/Header';
import BlogForm from '../components/BlogForm';
import { NewBlog } from '../services/api/userApi';
import { toast } from 'sonner';

const AddBlog = () => {

    const handleCreateBlog = async (payload) => {
        try {
          const response = await NewBlog(payload);
          if (response) toast.success("Blog created successfully");
        } catch (error) {
          toast.error("Failed to create blog.");
        }
      };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="pt-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-lg font-semibold">New Blog Post</h2>
          </div>
          <div>
            <BlogForm apiFunction={handleCreateBlog} buttonLabel="Create Blog"/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBlog;
