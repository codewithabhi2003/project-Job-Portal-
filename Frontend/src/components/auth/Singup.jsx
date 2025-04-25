import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setloading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading, user } = useSelector(store => store.auth); // ✅ Get `loading` from Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phone);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setloading(true)); // ✅ Set loading to true

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        toast.success("Signup successful!");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      dispatch(setloading(false)); // ✅ Ensure loading is set to false after request
    }
  };

   useEffect(() =>{
      if (user){
        navigate("/"); 
      }
    },[])

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded-md p-4 my-10">
          <h1 className="font-bold text-xl mb-5">Sign Up</h1>

          <div className="my-2">
            <Label>Full Name:</Label>
            <Input type="text" value={input.fullname} name="fullname" onChange={changeEventHandler} placeholder="Enter your full name." />
          </div>

          <div className="my-2">
            <Label>Email:</Label>
            <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="Enter your email." />
          </div>

          <div className="my-2">
            <Label>Phone Number:</Label>
            <Input type="text" value={input.phone} name="phone" onChange={changeEventHandler} placeholder="Enter your phone number." />
          </div>

          <div className="my-2">
            <Label>Password:</Label>
            <Input type="password" value={input.password} name="password" onChange={changeEventHandler} placeholder="Enter your password." />
          </div>

          <div className="flex items-center justify-between mt-4 flex-wrap gap-4">
            <div className="flex items-center space-x-4">
              <Label>Role:</Label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="role" value="job-seeker" checked={input.role === 'job-seeker'} onChange={changeEventHandler} />
                <span>Job-seeker</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="radio" name="role" value="Recruiter" checked={input.role === 'Recruiter'} onChange={changeEventHandler} />
                <span>Recruiter</span>
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Label>Profile:</Label>
              <input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer border border-gray-300 rounded-md px-3 py-2 w-full sm:w-auto" />
            </div>
          </div>

          {/* ✅ Fixed loading logic */}
          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="cursor-pointer w-full my-4 text-white bg-black active:bg-gray-800">
              Signup
            </Button>
          )}

          <span className="text-sm block text-center">
            Already have an account? <Link to="/login" className="text-blue-600">Login</Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Signup;