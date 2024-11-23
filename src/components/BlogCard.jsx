import { BookOpen } from "lucide-react";
import React from "react";

const BlogCard = ({ blog, showActions, onEdit, onDelete }) => {
  const {
    title,
    short_description,
    first_image,
    user_name,
    user_profile_picture,
    tags,
    reading_time,
    created_at,
    slug,
  } = blog;

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-300">
      <img
        src={first_image}
        alt={title}
        className="h-48 w-full md:w-1/3 object-cover"
      />

      <div className="p-6 flex flex-col justify-between">
        {/* User Details */}
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user_profile_picture || "https://via.placeholder.com/40"}
            alt={`${user_name} profile`}
            className="h-10 w-10 rounded-full border border-gray-300"
          />
          <div>
            <p className="text-sm text-gray-600 font-medium">{user_name}</p>
            <p className="text-xs text-gray-500">
              {new Date(created_at).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Blog Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>

        {/* Blog Description */}
        <p className="text-sm text-gray-700 line-clamp-3 mb-4">
          {short_description}
        </p>

        {/* Tags and Reading Time */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-4">
          <p className="text-sm text-gray-500 flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            {reading_time || "Unknown"} min read
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full whitespace-nowrap"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <a
            href={`/blog/${slug}`}
            className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
          >
            Read More →
          </a>

          {showActions && (
            <div className="flex gap-2">
              <button
                onClick={onEdit}
                className="text-gray-600 hover:text-gray-800"
              >
                Edit
              </button>
              <button
                onClick={onDelete}
                className="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
