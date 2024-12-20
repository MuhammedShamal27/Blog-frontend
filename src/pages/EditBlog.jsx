import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import BlogForm from "../components/BlogForm";
import { BlogFullDetails, EditABlog } from "../services/api/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditBlog = () => {
  const { slug } = useParams(); 
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogDetails  = await BlogFullDetails(slug);
        console.log(blogDetails)
        setInitialData(blogDetails.data.data );
        setLoading(false); 
      } catch (error) {
        setLoading(false);
        toast.error("Failed to fetch blog details.");
      }
    };

    fetchBlogDetails();
  }, [slug]);

  const handleEditBlog = async (payload) => {
    try {
      const response = await EditABlog(slug, payload);
      console.log(response)
      if (response) toast.success("Blog updated successfully");
      navigate('/blog-listing')
    } catch (error) {
      toast.error("Failed to update blog.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!initialData) {
    return <div>No blog data found</div>;
  }

  return (
    <div>
      <Header />
      <div className="pt-7 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div>
            <h2 className="text-lg font-semibold">Edit Blog Post</h2>
          </div>
          <div>
            <BlogForm
              apiFunction={handleEditBlog}
              initialData={initialData}
              buttonLabel="Update Blog"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
