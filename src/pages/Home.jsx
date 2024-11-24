import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import { BlogList } from "../services/api/userApi";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
    } else {
      window.history.replaceState(null, "", "/");
    }
  }, [navigate]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await BlogList();
        console.log(response.data);
        setBlogs(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-6">Recent blog posts</h2>
        {blogs.length > 0 ? (
          <div className="grid gap-6">
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} showActions={false} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-xl font-semibold mb-4">Welcome to the Blog!</h3>
            <p className="text-gray-600 mb-4">
              It looks like there are no blogs available right now. Be the first to create one!
            </p>
            <p className="text-gray-600">Have a great day and make your new blog with us.</p>
            <div className="mt-6">
              <button
                onClick={() => navigate("/new-blog")} 
                className="bg-black text-white py-2 px-4 rounded-md"
              >
                Create Your Blog
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
