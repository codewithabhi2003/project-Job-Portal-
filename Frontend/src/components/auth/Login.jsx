import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from "axios";
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setloading, setUser } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading,user } = useSelector(store => store.auth);
  const navigate = useNavigate(); // ✅ Correct way to use navigation
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setloading(true)); // ✅ Moved inside try-catch

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        navigate("/"); // ✅ Correct way to navigate
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setloading(false)); // ✅ Moved inside try-catch
    }
  }
  
  useEffect(() =>{
    if (user){
      navigate("/"); 
    }
  },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center mx-auto p-4">
        <form onSubmit={submitHandler} className="w-full max-w-sm sm:max-w-md md:max-w-lg border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5 text-center">Login</h1>

          {/* Email */}
          <div className="my-2">
            <Label>Email:</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter your email." className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-0 focus:border-blue-500" />
          </div>

          {/* Password */}
          <div className="my-2">
            <Label>Password:</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your password." className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-0 focus:border-blue-500" />
          </div>

          {/* Role Selection */}
          <div className="my-4">
            <Label>Role:</Label>
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center space-x-2">
                <input type="radio" name="role" value="job-seeker" checked={input.role === 'job-seeker'} onChange={changeEventHandler} className="cursor-pointer" />
                <span>Job-seeker</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="role" value="Recruiter" checked={input.role === 'Recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                <span>Recruiter</span>
              </label>
            </div>
          </div>

          {/* Loader and Button */}
          {loading ? (
            <Button className= "w-full my-4">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="cursor-pointer w-full my-4 text-white bg-black active:bg-gray-800">
              Login
            </Button>
          )}

          {/* Signup Link */}
          <span className="text-sm block text-center">
            Don't have an account? <Link to="/signup" className="text-blue-600">Signup</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

