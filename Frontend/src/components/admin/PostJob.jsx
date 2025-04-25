import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: "",
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies = [] } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        if (selectedCompany) {
            setInput({ ...input, companyId: selectedCompany._id });
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10'>
                <h1 className='font-extrabold text-2xl text-gray-900 mb-6'>Post a New Job</h1>
                <form onSubmit={submitHandler}>
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label>Title</Label>
                            <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label>Requirements</Label>
                            <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label>Salary</Label>
                            <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label>Job Type</Label>
                            <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label>Experience Level</Label>
                            <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <Label>No of Positions</Label>
                            <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500" />
                        </div>
                        {companies.length > 0 && (
                            <div className='col-span-2'>
                                <Label>Select a Company</Label>
                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-white shadow-lg border border-gray-300 rounded-md focus:outline-none focus:ring-0">


                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>
                    <div className='mt-6'>
                        {loading ? (
                            <Button className="w-full bg-gray-400 text-white py-3 rounded-lg flex items-center justify-center">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Posting Job...
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                                Post Job
                            </Button>
                        )}
                    </div>
                    {companies.length === 0 && (
                        <p className='text-xs text-red-600 font-bold text-center mt-3'>
                            Please register a company first before posting a job.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}

export default PostJob;
