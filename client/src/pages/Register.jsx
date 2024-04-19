import React, { useState } from 'react'
import { Link  } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    email:"",
    password:""
  })

  const [ error, setError] = useState(null)

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setInputs(prev => ({...prev,[e.target.name]:e.target.value}))
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs)
      navigate("/login")
    } catch (error) {
      console.log(error)
      setError(error.response.data)
    }
  } 
  return (
    <div className='auth'>
        <h1>Register</h1>
        <form>
        <input type='text' placeholder='username'required name='username' onChange={handleOnChange}/>
            <input type='email' placeholder='email' required name='email' onChange={handleOnChange}/>
            <input type='password' placeholder='password' name='password' required onChange={handleOnChange}/>
            <button onClick={handleSubmit}>Register</button>
            {error && <p>{error}</p>}
            <span>Do you have an account?
              <Link to="/login">Login</Link>
            </span>
        </form>
    </div>
  )
}

export default Register