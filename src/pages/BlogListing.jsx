import React, { useEffect, useState } from 'react';
import { Calendar, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import { UserBlogs } from '../services/api/userApi';
import { useNavigate } from 'react-router-dom';

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await UserBlogs();
        if (response) {
          setBlogs(response.data);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-blog/${id}`)
    console.log(`Edit blog with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete blog with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Blog Listing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {blogs.map((blog) => (
            <div key={blog.id} className="hover:shadow-lg transition-shadow rounded-lg border border-gray-200">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Blog Image */}
                <div className="md:col-span-1">
                  <img
                    src={blog.first_image}
                    alt="Blog picture"
                    className="w-full h-48 object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
                  />
                </div>

                {/* Blog Content */}
                <div className="md:col-span-2 p-6 flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 mb-4">{blog.short_description}</p>

                    {/* Meta Information */}
                    <div className="flex flex-wrap items-center gap-4 text-gray-500 mb-4">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{blog.created_at}</span> {/* Display the actual date */}
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        <span>{blog.read_count}</span> {/* Replace with actual read count */}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex justify-between items-center mt-4">
                    <button className="text-blue-600 hover:text-blue-800 font-medium">
                      Read More
                    </button>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(blog.id)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8 space-x-2">
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Previous
          </button>
          <button className="px-4 py-2 border rounded-md hover:bg-gray-100">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogListing;
