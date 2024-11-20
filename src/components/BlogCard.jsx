import React from 'react'

const BlogCard = ({ blog }) => {
    const { title, date, description, tags, image } = blog;

  return (
    <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg overflow-hidden">
        <img
            src={image}
            alt={title}
            className="h-48 w-full md:w-1/3 object-cover"
        />
        <div className="p-4 flex flex-col">
            <p className="text-sm text-gray-500">{date}</p>
            <h3 className="text-lg font-semibold mt-2">{title}</h3>
            <p className="text-gray-700 mt-2">{description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                    <span
                        key={index}
                        className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BlogCard