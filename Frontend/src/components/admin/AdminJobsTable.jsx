import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';

const AdminJobsTable = () => { 
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => { 
        const filteredJobs = allAdminJobs.filter((job) => {
            if (!searchJobByText) {
                return true;
            }
            return job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) || 
                   job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase());
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchJobByText]);

    return (
        <div className="p-8 bg-white shadow-lg rounded-2xl">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Posted Jobs</h2>
            <Table className="w-full border-collapse">
                <TableCaption className="text-gray-500 text-sm">A list of your recent posted jobs</TableCaption>
                <TableHeader className="bg-gray-200 text-gray-700">
                    <TableRow>
                        <TableHead className="p-4 text-left">Logo</TableHead>
                        <TableHead className="p-4 text-left">Company Name</TableHead>
                        <TableHead className="p-4 text-left">Role</TableHead>
                        <TableHead className="p-4 text-left">Date</TableHead>
                        <TableHead className="p-4 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.map((job, index) => (
                        <TableRow key={job._id} className={`border-b ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-gray-100 transition`}>
                            <TableCell className="p-4">
                                <Avatar className="w-12 h-12 border border-gray-300 shadow-md">
                                    <AvatarImage src={job?.company?.logo || '/default-logo.png'} />
                                </Avatar>
                            </TableCell>
                            <TableCell className="p-4 text-gray-900">{job?.company?.name}</TableCell>
                            <TableCell className="p-4 font-medium text-gray-800">{job?.title}</TableCell>
                            <TableCell className="p-4 text-gray-600">{job?.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="p-4 text-right">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="ghost" size="icon" className="hover:bg-gray-200 p-2 rounded-full transition">
                                            <MoreHorizontal className="text-gray-600 w-5 h-5" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-40 p-2 bg-white shadow-xl rounded-lg">
                                        <div onClick={() => navigate('/admin/jobs/create')}>
                                            <Button
                                                variant="default"
                                                className="flex items-center gap-2 w-full px-3 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition"
                                            >
                                                <Edit2 className="w-4" />
                                                <span>Edit</span>
                                            </Button>
                                        </div>
                                        <div onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="mt-2">
                                            <Button
                                                variant="default"
                                                className="flex items-center gap-2 w-full px-3 py-2 bg-green-600 text-white hover:bg-green-700 rounded-md transition"
                                            >
                                                <Eye className="w-4" />
                                                <span>Applicants</span>
                                            </Button>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default AdminJobsTable;
