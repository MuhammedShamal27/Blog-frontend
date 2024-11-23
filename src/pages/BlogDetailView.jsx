import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Calendar, ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import { BlogFullDetails } from "../services/api/userApi";
import Header from "../components/Header";

const BlogDetailView = () => {
  const { slug } = useParams(); 
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); 

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const response = await BlogFullDetails(slug);
        console.log(response);
        setBlog(response.data.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found.</div>;
  }

  const handleNext = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % blog.media.length 
    );
  };

  const handlePrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + blog.media.length) % blog.media.length 
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="w-full h-[60vh] relative bg-black">
        <img
          src={blog.media[currentImageIndex]} 
          alt={blog.title}
          className="w-full h-full object-cover opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-200">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.user_name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(blog.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{blog.reading_time} min read</span>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={handlePrevious}
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={handleNext}
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/30 text-white p-2 rounded-full"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="p-8">
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="prose max-w-none">{blog.description}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailView;
