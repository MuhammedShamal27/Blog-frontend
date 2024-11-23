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

  if (!blogs.length) {
    return <div>No blogs available.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-6">
        <h2 className="text-xl font-semibold mb-6">Recent blog posts</h2>
        <div className="grid gap-6">
          {blogs.map((blog, index) => (
            <BlogCard key={index} blog={blog} showActions={false} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;
