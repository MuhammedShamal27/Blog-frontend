import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import Home from '../pages/Home'
import Register from '../pages/Register'
import Login from '../pages/Login'
import AddBlog from '../pages/AddBlog'
import BlogListing from '../pages/BlogListing'
import EditBlog from '../pages/EditBlog'
import BlogDetailView from '../pages/BlogDetailView'
import ProfileEdit from '../pages/ProfileEdit'
import Profile from '../pages/Profile'
import ProtectRoutes from './ProtectRoutes'

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
            element: <ProtectRoutes> <AddBlog/> </ProtectRoutes>
        },
        {
            path: '/blog-listing',
            element: <ProtectRoutes> <BlogListing/> </ProtectRoutes> 
        },
        {
            path: '/blog/:slug',
            element: <ProtectRoutes> <BlogDetailView/> </ProtectRoutes>
        },
        {
            path: '/edit-blog/:slug',
            element: <ProtectRoutes> <EditBlog/> </ProtectRoutes>
        },
        {
            path: '/profile',
            element: <ProtectRoutes> <Profile/> </ProtectRoutes>
        },
        {
            path: '/edit-profile',
            element: <ProtectRoutes> <ProfileEdit/> </ProtectRoutes>
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