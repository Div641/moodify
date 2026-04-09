import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate, useNavigate } from 'react-router'
import { useEffect } from 'react'

const Protected = ({children}) => {
    const {user, loading} = useAuth()
    const navigate= useNavigate()

    if(!loading && !user){
        return <Navigate to="/login" />
    }

    if(loading){
        return <p>Loading...</p>
    }

    

    return (children)
}

export default Protected