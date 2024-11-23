import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { UserBlogs, DeleteBlog } from "../services/api/userApi"; // Ensure DeleteBlog is imported
import { useNavigate } from "react-router-dom";
import BlogCard from "../components/BlogCard"; // Assuming BlogCard is a reusable component
import { toast } from "sonner";

const BlogListing = () => {
  const [blogs, setBlogs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [confirmationText, setConfirmationText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await UserBlogs();
        if (response) {
          setBlogs(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchBlogs();
  }, []);

  const handleEdit = (slug) => {
    navigate(`/edit-blog/${slug}`);
  };

  const openDeleteModal = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setDeleteId(null);
    setShowModal(false);
    setConfirmationText("");
  };

  const confirmDelete = async () => {
    if (confirmationText !== "delete") {
      toast.error("You need to type 'delete' to confirm.");
      return;
    }

    try {
      const response = await DeleteBlog(deleteId);
      setBlogs(blogs.filter((blog) => blog.id !== deleteId)); // Remove the deleted blog from the list
      toast.success(response.message || "Blog deleted successfully.");
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete blog.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Blog Listing */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div key={blog.id} className="relative group">
              {/* Reusing BlogCard */}
              <BlogCard
                blog={blog}
                showActions={true}
                onEdit={() => handleEdit(blog.slug)}
                onDelete={() => openDeleteModal(blog.id)}
              />
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">No blogs found.</p>
        )}

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

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-4">
              To delete this blog, type <strong>delete</strong> in the box
              below and click Confirm.
            </p>
            <input
              type="text"
              value={confirmationText}
              onChange={(e) => setConfirmationText(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-4"
              placeholder="Type 'delete' to confirm"
            />
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteModal}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className={`px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 ${
                  confirmationText !== "delete" ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={confirmationText !== "delete"}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogListing;
