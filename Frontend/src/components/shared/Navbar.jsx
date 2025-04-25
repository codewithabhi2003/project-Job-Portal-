import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { LogOut, User2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

function Navbar() {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white shadow-md">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Logo Section */}
        <h1 className="text-2xl font-bold tracking-wide text-gray-800">
          Job<span className="text-[#F83002]">Portal</span>
        </h1>

        {/* Navigation Links & Profile Section */}
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-6 text-gray-700">
            {user && user.role === "Recruiter" ? (
              <>
                <li className="hover:text-[#F83002] transition">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-[#F83002] transition">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-[#F83002] transition">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-[#F83002] transition">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-[#F83002] transition">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/Login">
                <Button variant="outline" className="px-5 py-2 border-gray-300 text-gray-700 hover:border-gray-400">
                  Login
                </Button>
              </Link>
              <Link to="/Singup">
                <Button className="bg-[#6A38C2] hover:bg-[#5b30a6] px-5 py-2 text-white rounded-lg shadow-md transition">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer hover:ring-2 hover:ring-gray-300 transition">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-4 bg-white shadow-lg rounded-lg">
                <div>
                  <div className="flex items-center gap-3 border-b pb-3">
                    <Avatar className="cursor-pointer w-12 h-12">
                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">{user?.fullname}</h4>
                      <p className="text-sm text-gray-500">{user?.profile?.bio}</p>
                    </div>
                  </div>

                  <div className="flex flex-col mt-3 space-y-2 text-gray-600">
                    {user && user.role === "job-seeker" && (
                      <div className="flex items-center gap-2 cursor-pointer hover:text-[#6A38C2] transition">
                        <User2 className="w-5 h-5" />
                        <Button variant="link">
                          <Link to="/Profile">View Profile</Link>
                        </Button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 cursor-pointer hover:text-[#F83002] transition">
                      <LogOut className="w-5 h-5" />
                      <Button onClick={logoutHandler} variant="link" className="text-gray-700 hover:text-red-600">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
