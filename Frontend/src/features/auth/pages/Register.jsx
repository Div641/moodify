import React,{useState} from 'react'
import "../style/register.scss"
// import "../component/FormGroup"
import FormGroup from '../component/FormGroup'
import { Link } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from "react-router"

const Register = () => {
  
  const {loading,handleRegister} = useAuth()
  const navigate = useNavigate()

  const [username, setusername] = useState("")
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')

  async function handleSubmit(e){
    e.preventDefault()
    try{
    await handleRegister({username,email,password})
    navigate("/")
    }catch(err){
      console.error(err)
    }
  }

  return (
    <main className="register-page">
        <div className="form-container">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
              <FormGroup 
              value={username}
              onChange={(e) => setusername(e.target.value)}
              label="Name" placeholder="Enter your username" />
              <FormGroup 
              value={email}
              onChange={(e) => setemail(e.target.value)}
              label="Email" placeholder="Enter your email" />
              <FormGroup 
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              label="Password" placeholder="Enter your password" />
              <button className='button' type="submit">Register</button>
            </form>
            <p>Already have an account?
              <Link to="/login">Login here</Link>
            </p>
            </div>
    </main>
  )
}

export default Register

// establish react router to be able to see login=>login form & register=>register form