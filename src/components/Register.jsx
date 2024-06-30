import React, { useState } from "react";
import Img from "../assets/Sign_up.png";
import { Form, Button, InputGroup } from "react-bootstrap";
import { registerUser } from "./utils/axiosInstance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name == "userRole")
      setFormData((prev) => { return { ...prev, [name]: event.target.checked == true ? "ADMIN" : "USER" } });
    else
      setFormData((prev) => { return { ...prev, [name]: value } });
  }

  const register = async () => {
    try {
      await registerUser(formData);
      toast.success("Registered Successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  return (
    <div className="container">
      <div className="formContainer">
        <h1 className="px-5 mt-2">Register</h1>
        <Form>
          <Form.Control className="mt-1" type="text" placeholder="First Name" name="firstName" onChange={handleChange} value={formData.firstName} />
          <Form.Control className="mt-3" type="text" placeholder="Last Name" name="lastName" onChange={handleChange} value={formData.lastName} />
          <Form.Control className="mt-3" type="text" placeholder="Username" name="userName" onChange={handleChange} value={formData.userName} />
          <Form.Control className="mt-3" type="password" placeholder="Password" name="password" onChange={handleChange} value={formData.password} />
          <Form.Control className="mt-3" type="email" placeholder="Email" name="email" onChange={handleChange} value={formData.email} />
          <Form.Control className="mt-3" type="number" placeholder="Mobile Number" name="mobileNumber" onChange={handleChange} value={formData.mobileNumber} />
          <InputGroup className="mt-3 ">
            <Form.Check onChange={handleChange} name="userRole" />
            <p className="mx-2">Register as Admin</p>
          </InputGroup>

          <InputGroup className="mt-2 mb-3">
            <button className="btn btn-primary rounded" type="button" onClick={register}>Register</button>
            <p className="mx-2 my-auto ">Already have an account? <a href="/login">Login</a></p>
          </InputGroup>

        </Form>

      </div>

      <div className="imgregister">
        <img src={Img} />
      </div>
    </div>
  );
};

export default Register;
