import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
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
      
      const response = await axios.post('/user/register', formData);

      navigate("/")
      console.log(response.data);
    } catch (error) {
   
      console.error('Registration failed:', error.message);
    }
  };

  return (
    <div className='grow items-center justify-around flex'>
      <div className='-mt-8'>
        <h1 className='text-3xl mb-4 text-center'>Register</h1>
        <form className='max-w-md mx-auto' onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleInputChange}
          />
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
          <button type="submit" className='primary'>Register</button>
          <div className="text-center text-gray-500 py-2">
            Already Have an account? <Link className='underline text-black' to="/login">LogIn now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
