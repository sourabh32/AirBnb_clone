import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {useNavigate} from "react-router-dom"
import { userContext } from '../context/UserContext';
const LoginPage = () => {
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
const {setUser} = useContext(userContext)
 const navigate = useNavigate()
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      
      const response = await axios.post('/user/auth', formData);
      setUser(response.data)
      navigate("/")
     
    } catch (error) {
      
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className='grow items-center justify-around flex'>
      <div className='-mt-8'>
        <h1 className='text-3xl mb-4 text-center'>Login</h1>
        <form className='max-w-md mx-auto' onSubmit={handleFormSubmit}>
          <input
            type="email"
            name="email"
            placeholder="@youremail"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Type password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <button type="submit" className='primary'>Login</button>
          <div className="text-center text-gray-500 py-2">
            Don't have an account yet? <Link className='underline text-black' to="/register">Register now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
