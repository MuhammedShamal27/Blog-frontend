import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const ProtectRoutes = ({children}) => {
    const navigate = useNavigate();
    const isToken = localStorage.getItem("token");
    useEffect(()=>{
        if (!isToken){
            navigate('/login')
        }
    })

  return isToken ? children : null
}

export default ProtectRoutes