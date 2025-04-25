import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Label } from "./ui/label";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { useSelector } from "react-redux";
import useGetAppliedJobs from "@/hooks/useGetAppliedJobs";

const Profile = () => {
    useGetAppliedJobs();
    const [openEdit, setOpenEdit] = useState(false);
    const [openProfile, setOpenProfile] = useState(false);
    const { user } = useSelector((store) => store.auth);

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />

            {/* Profile Card */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg border border-gray-200 rounded-2xl my-5 p-8">
                <div className="flex justify-between items-center">
                    {/* Avatar and User Info */}
                    <div className="flex items-center gap-6">
                        {/* Profile Picture (Clickable for Popout) */}
                        <Dialog open={openProfile} onOpenChange={setOpenProfile}>
                            <DialogTrigger asChild>
                                <Avatar
                                    className="h-24 w-24 border-4 border-purple-500 shadow-lg cursor-pointer hover:opacity-80 transition-all"
                                    onClick={() => setOpenProfile(true)}
                                >
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                                        alt="Profile"
                                    />
                                </Avatar>
                            </DialogTrigger>

                            {/* Profile Popout Modal (3:4 Aspect Ratio) */}
                            <DialogContent className="bg-white rounded-xl p-6 flex items-center justify-center shadow-2xl">
                                <img
                                    src={user?.profile?.profilePhoto || "https://via.placeholder.com/150"}
                                    alt="Profile"
                                    className="w-72 h-96 object-cover rounded-lg border-4 border-purple-500 shadow-lg"
                                />
                            </DialogContent>
                        </Dialog>

                        <div>
                            <h1 className="font-bold text-2xl text-gray-900">{user?.fullname}</h1>
                            <p className="text-gray-600">{user?.profile?.bio || "No bio added yet"}</p>
                        </div>
                    </div>

                    {/* Edit Button */}
                    <Button
                        onClick={() => setOpenEdit(true)}
                        variant="outline"
                        className="border-gray-400 text-gray-600 hover:bg-gray-200"
                    >
                        <Pen size={16} className="mr-2" /> Edit
                    </Button>
                </div>

                {/* Contact Information */}
                <div className="my-6 border-t pt-4">
                    <div className="flex items-center gap-3 my-2 text-gray-700">
                        <Mail className="text-gray-500" />
                        <span>{user?.email || "No email available"}</span>
                    </div>
                    <div className="flex items-center gap-3 my-2 text-gray-700">
                        <Contact className="text-gray-500" />
                        <span>{user?.phoneNumber || "No phone number available"}</span>
                    </div>
                </div>

                {/* Skills Section */}
                <div className="my-6">
                    <h1 className="font-semibold text-lg text-gray-800">Skills</h1>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {user?.profile?.skills?.length > 0 ? (
                            user.profile.skills.map((item, index) => (
                                <Badge key={index} className="bg-purple-600 text-white px-3 py-1 rounded-md shadow-md">
                                    {item}
                                </Badge>
                            ))
                        ) : (
                            <span className="text-gray-600">No Skills Added</span>
                        )}
                    </div>
                </div>

                {/* Resume Section */}
                <div className="mt-6">
                    <Label className="text-md font-bold text-gray-800">{user?.profile?.resumeOriginalName || "Resume"}</Label>
                    {user?.profile?.resume ? (
                        <a
                            target="_blank"
                            href={user?.profile?.resume}
                            className="text-blue-600 hover:underline cursor-pointer block mt-1"
                        >
                            View Resume
                        </a>
                    ) : (
                        <span className="text-gray-600">No Resume Uploaded</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 mt-6">
                <h1 className="font-bold text-lg text-gray-800 mb-4">Applied Jobs</h1>
                <AppliedJobTable />
            </div>

            {/* Update Profile Modal */}
            <UpdateProfileDialog open={openEdit} setOpen={setOpenEdit} />
        </div>
    );
};

export default Profile;

