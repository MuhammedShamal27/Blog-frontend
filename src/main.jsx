import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from "sonner";
import userRoutes from './routes/userRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Toaster closeButton postion="bottom-right" />
      <RouterProvider router={userRoutes}/>
    <Toaster/>
  </React.StrictMode>,
)
