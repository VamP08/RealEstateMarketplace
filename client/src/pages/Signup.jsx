import { useState } from 'react';
import { Link , useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';

export default function Signup() {
  const [formdata, setformdata] = useState({});
  const [error, seterror] = useState(null);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();

  const handlechange = (e) => {
    setformdata({
      ...formdata,
      [e.target.id]: e.target.value,
    });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      setloading(true);
      const res = await fetch('/server/auth/signup', 
      {
        method : 'POST',
        headers : {
        'Content-Type' : 'application/json',
      },
      body : JSON.stringify(formdata),
    });
    const data = await res.json();
    console.log(data);
    if (data.success === false) {
      setloading(false);
      seterror(data.errormessage);
      return;
    }
    setloading(false);
    seterror(null);
    navigate('/sign-in');
    }
    catch (error){
      setloading(false);
      seterror(error.message);
      console.log(error.message);
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-centre font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handlesubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='Username'
        className='border p-3 rounded-lg' id='username'
        onChange={handlechange} />
        <input type='email' placeholder='Email'
        className='border p-3 rounded-lg' id='email'
        onChange={handlechange} />
        <input type='password' placeholder='Password'
        className='border p-3 rounded-lg' id='password'
        onChange={handlechange} />
        <button disabled={loading} className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading  ? 'Loading...' : 'Sign up'}
        </button>
        <Oauth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}> <span className='text-blue-700'>Sign In</span> </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
