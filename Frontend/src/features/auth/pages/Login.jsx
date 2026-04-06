import React , {useState} from 'react'
import "../style/login.scss"
import FormGroup from '../component/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from "react-router"
import "../component/FormGroup"

const Login = () => {

    const {loading, handleLogin} = useAuth()
    const navigate = useNavigate()

    // const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    async function handleSubmit(e){
        e.preventDefault()
        try {
            await handleLogin({email, password})
            navigate("/")
        } catch (err) {
            console.error(err)
        }
    }

  return (
   <main className="login-page">
        <div className="form-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <FormGroup 
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                    label="Email" placeholder="Enter your email" />
                <FormGroup
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)}
                    label="Password" placeholder="Enter your password" />
                <button className='button' type="submit">Login</button>
            </form>
            <p>Don't have an account?
              <Link to="/register">Register here</Link>
            </p>
        </div>
   </main>
  )
}

export default Login