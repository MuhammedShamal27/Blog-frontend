import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import AddBlog from '../pages/AddBlog'
import BlogListing from '../pages/BlogListing'
import EditBlog from '../pages/EditBlog'

const userRoutes = createBrowserRouter ([{
    path: '/',
    element: <App/>,

    children:[
        {
            path: '/',
            element: <Home/>
        },
        {
            path: '/register',
            element: <Register/>,
        },
        {
            path: '/login',
            element: <Login />,
        },
        {
            path: '/new-blog',
            element: <AddBlog/>
        },
        {
            path: '/blog-listing',
            element: <BlogListing/>
        },
        {
            path: '/edit-blog/:id',
            element: <EditBlog/>
        }
    ]
}],
{
    future: {
    v7_startTransition: true, 
    },
}
) 

export default userRoutes