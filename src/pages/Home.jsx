import React from 'react'

import Header from '../components/Header';
import BlogCard from '../components/BlogCard';

const Home = () => {
    const blogs = [
        {
            title: 'UX review presentations',
            date: 'Sunday, 1 Jan 2023',
            description: 'How do you create compelling presentations that wow your colleagues and impress your managers?',
            tags: ['Design', 'Research', 'Presentation'],
            image: 'https://via.placeholder.com/600x300', // Placeholder image
        },
        {
            title: 'Migrating to Linear 101',
            date: 'Sunday, 1 Jan 2023',
            description: 'Linear helps streamline software projects, sprints, tasks, and bug tracking. Here’s how to get started.',
            tags: ['Design', 'Research'],
            image: 'https://via.placeholder.com/600x300', // Placeholder image
        },
    ];
  return (
    <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="p-6">
            <h1 className="text-4xl font-bold mb-4">THE BLOG</h1>
            <h2 className="text-xl font-semibold mb-6">Recent blog posts</h2>
            <div className="grid gap-6">
                {blogs.map((blog, index) => (
                    <BlogCard key={index} blog={blog} />
                ))}
            </div>
        </main>
    </div>
  )
}

export default Home