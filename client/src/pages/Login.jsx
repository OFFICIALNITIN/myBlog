import React, { useContext, useState } from 'react'
import { Link  } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from '../context/authContext';

const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
    password:""
  })

  const [ error, setError] = useState(null)


  const { login } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setInputs(prev => ({...prev,[e.target.name]:e.target.value}))
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      navigate("/")
    } catch (error) {
      console.log(error)
      setError(error.response.data)
    }
  } 
  return (
    <div className='auth'>
        <h1>Login</h1>
        <form>
        <input type='text' placeholder='username'required name='username' onChange={handleOnChange}/>
            <input type='password' placeholder='password' name='password' required onChange={handleOnChange}/>
            <button onClick={handleSubmit}>Submit</button>
            {error && <p>{error}</p>}
            <span>Don't you have an account?
              <Link to="/register">Register</Link>
            </span>
        </form>
    </div>
  )
}

export default Login