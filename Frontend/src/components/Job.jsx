import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const Job = ({job}) => {
    const navigate = useNavigate();
    const daysagoFunction = (mongodbTime) =>{
        const createdAt = new Date(mongodbTime);
        const currentTime = new Date();
        const timeDifference  = currentTime - createdAt;
        return Math.floor(timeDifference/ (1000*24*60*60));

    }
    
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 transition hover:shadow-2xl">
            {/* Top Section: Date & Bookmark */}
            <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{daysagoFunction(job?.createdAt)==0? "Today": `${daysagoFunction(job?.createdAt)} days ago`}</p>
                <Button className="rounded-full bg-transparent hover:bg-gray-100 active:bg-gray-300 transition duration-150" size="icon">
                    <Bookmark className="text-gray-600" />
                </Button>
            </div>

            {/* Company Info Section */}
            <div className="flex items-center gap-4 my-4">
                <Avatar className="w-14 h-14 border border-gray-200 shadow-sm">
                    <AvatarImage src={job?.company?.logo}/>
                </Avatar>
                <div>
                    <h1 className="font-semibold text-lg text-gray-900">{job?.company?.name}</h1>
                    <p className="text-sm text-gray-500">India</p>
                </div>
            </div>

            {/* Job Title & Description */}
            <div className="my-4">
                <h1 className="font-bold text-xl text-gray-900">{job?.title}</h1>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {job?.discription}
                </p>
            </div>

            {/* Job Details Badges */}
            <div className="flex flex-wrap items-center gap-2 mt-4">
                <Badge className="bg-gray-100 text-blue-700 font-semibold px-3 py-1 rounded-md">{job?.position} position</Badge>
                <Badge className="bg-gray-100 text-[#F83002] font-semibold px-3 py-1 rounded-md">{job.jobType}</Badge>
                <Badge className="bg-gray-100 text-[#7209b7] font-semibold px-3 py-1 rounded-md">{job?.salary} LPA </Badge>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4 mt-6">
                <Button onClick={()=> navigate(`/description/${job?._id}`) } className="border border-gray-400 text-gray-700 bg-white hover:bg-gray-100 active:bg-gray-300 px-5 py-2 rounded-lg transition">
                    Details
                </Button>

                <Button className="bg-[#7209b7] text-white hover:bg-[#5e0894] active:bg-[#56088a] px-5 py-2 rounded-lg transition">
                    Save For Later
                </Button>
            </div>
        </div>
    );
}

export default Job;
