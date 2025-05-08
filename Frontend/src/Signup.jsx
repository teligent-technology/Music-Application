import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';






function Signup() {
  const [form, setForm] = useState({
    name: '',
    Mobile: '',
    Song: '',
    username: '',
    password: ''
  });

  const Navigate=useNavigate()

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/person/', form);
      console.log('Raw response:', res);

      if (res.status === 200) {
        console.log("Status is 200 OK");
        Navigate('/login')
        console.log("Success:", res.data);
        alert(res.data.message); // Now this will work
      } else {
        console.warn("Received non-200 response:", res.status);
      }

      console.log('Success:', res.data);
    } catch (err) {
      console.error('Error:', err);
      const error = err.response?.data?.error || err.message || 'Signup failed';
      alert(error);
    }
  };
  

  return (


  <form onSubmit={handleSubmit}>
  <h2>Sign Up</h2>

  <input name="name" type="text" onChange={handleChange} placeholder="Enter Your name" value={form.name} required/>
      

      <input name="Mobile" placeholder="Mobile" type="number" value={form.Mobile} onChange={handleChange} />

      <select name="Song" value={form.Song} onChange={handleChange} required>
        <option value="">Select Song</option>
        <option value="Punjabi">Punjabi</option>
        <option value="bhojpuri">Bhojpuri</option>
        <option value="Haryanvi">Haryanvi</option>
      </select>

    <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />

    <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
    <button type="submit" >Sign Up</button>
    <p>Already have an account? <Link to="/login">Login</Link></p>

    </form>
  

  
  );
}

export default Signup;
