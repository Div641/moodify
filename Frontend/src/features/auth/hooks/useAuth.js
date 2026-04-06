import {login,register,getMe,logout} from "../services/auth.api"
import { useContext } from "react"  
import { AuthContext } from "../auth.context"
import { useEffect } from "react"

export function useAuth(){
    const context = useContext(AuthContext)
    const {user, setUser, loading, setLoading} = context

    async function handleRegister({username,email,password}){
        try{
            setLoading(true)
            console.log("Sendings", ({username,email,password}))
            const data= await register({username,email,password})       
            setUser(data.user)
        }finally{
        setLoading(false)
        }
    }

    async function handleLogin({email,password}){
        try {
            setLoading(true)

            console.log("Sending:", { email, password }) 

            const data = await login({email,password})
            setUser(data.user)
        } finally {
            setLoading(false)
        }
    }
    
    async function handleGetMe(){
        setLoading(true)
        const data= await getMe()       
        setUser(data.user)
        setLoading(false)
    }

    async function handleLogout(){
        setLoading(true)
        const data = await logout()       
        setUser(null)
        setLoading(false)
    }

    useEffect(()=> {
        handleGetMe()
    },[]) //ye vapas user ko load karne ke liye useEffect me call karenge taki page refresh hone par bhi user logged in rahe

    return ({
        user, loading, handleRegister, handleLogin, handleGetMe, handleLogout
    })
}