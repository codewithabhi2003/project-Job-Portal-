import React, { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription  } from './ui/dialog'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

const UpdateProfileDialog = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector(store => store.auth);

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(", ") || "",
    file: null
  });
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }

  const fileChangeHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", JSON.stringify(input.skills.split(", ")));
    if (input.file) {
      formData.append("resume", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, input, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });
     
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px] bg-white shadow-lg rounded-lg border border-gray-300 p-6">
        <DialogHeader className="flex justify-between items-center">
          <div>
            <DialogTitle className="text-lg font-semibold text-gray-800">Update Profile</DialogTitle>
            <DialogDescription className="text-sm text-gray-500">
             
            </DialogDescription>
          </div>
          <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700">
             {/* Add an icon here if needed */}
          </button>
        </DialogHeader>
        <form onSubmit={submitHandler}>
          <div className='grid gap-5 py-4'>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="fullname" className="text-right text-gray-700 font-medium">Name</Label>
              <Input id="fullname" name="fullname" type="text" value={input.fullname} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="email" className="text-right text-gray-700 font-medium">Email</Label>
              <Input id="email" name="email" type="email" value={input.email} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="phoneNumber" className="text-right text-gray-700 font-medium">Number</Label>
              <Input id="phoneNumber" name="phoneNumber" value={input.phoneNumber} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="bio" className="text-right text-gray-700 font-medium">Bio</Label>
              <Input id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="skills" className="text-right text-gray-700 font-medium">Skills</Label>
              <Input id="skills" name="skills" value={input.skills} onChange={changeEventHandler} className="col-span-3" />
            </div>
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor="file" className="text-right text-gray-700 font-medium">Resume</Label>
              <Input id="file" name="file" type="file" accept="application/pdf" onChange={fileChangeHandler} className="col-span-3 text-gray-600" />
            </div>
          </div>
          <DialogFooter>
            {loading ? (
              <Button className="w-full my-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-md">
                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full my-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                Update
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateProfileDialog;

