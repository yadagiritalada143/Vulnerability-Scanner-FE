import React, { useState } from 'react'
import Img from '../assets/Mobile_login.png'
import { Form, Button, InputGroup } from 'react-bootstrap'
import { loginUser } from './utils/axiosInstance'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => { return { ...prev, [name]: value } });
  }

  const login = async () => {
    try {
      const data = await loginUser(formData);

      localStorage.setItem("jwt-token", data.data.token);
      localStorage.setItem("isAdmin", data.data.role == "ADMIN" ? "true" : "false");
      localStorage.setItem("email", formData.email);

      navigate("/home");

      toast.success("Login Succesful")
    } catch (error) {
      toast.error("Authentication Failed")
    }
  }

  return (
    <div className='container'>
      <div className="imglogin">
        <img src={Img} />
      </div>
      <div className="formContainer">
        <h1 className="px-5 mt-2">Login</h1>
        <Form>
          <Form.Control className="mt-2" type='email' placeholder='name@example.com' name="email" onChange={handleChange} value={formData.email} />
          <Form.Control className="mt-4" type='password' placeholder='*******' name="password" onChange={handleChange} value={formData.password} />

          <InputGroup className="mt-4 mb-3  ">
            <button className="rounded btn btn-primary" type='button' onClick={login}>Login</button>
            <p className='mx-2 my-auto'>Don't have an account? <a href='/register'>Register</a></p>
          </InputGroup>
        </Form>

      </div>


    </div>
  )
}

export default Login