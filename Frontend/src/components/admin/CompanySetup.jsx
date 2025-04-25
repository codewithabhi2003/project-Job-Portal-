import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Button } from '../ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import useGetCompanyById from '@/hooks/useGetCompanyById';

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const {singleCompany} = useSelector(store=>store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "An error occurred");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        })
    },[singleCompany]);
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10'>
                <form onSubmit={submitHandler}>
                    <div className='flex items-center gap-5 pb-6 border-b'>
                        <Button onClick={() => navigate("/admin/companies")} className='flex items-center gap-2 text-gray-600 hover:text-black'>
                            <ArrowLeft />
                            <span>Back</span>
                        </Button>
                        <h1 className='font-extrabold text-2xl text-gray-900'>Company Setup</h1>
                    </div>
                    <div className='grid grid-cols-2 gap-6 mt-6'>
                        <div>
                            <Label className='text-gray-700 font-semibold'>Company Name</Label>
                            <Input type="text" name="name" value={input.name} onChange={changeEventHandler} className='border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500' />
                        </div>
                        <div>
                            <Label className='text-gray-700 font-semibold'>Description</Label>
                            <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className='border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500' />
                        </div>
                        <div>
                            <Label className='text-gray-700 font-semibold'>Website</Label>
                            <Input type="text" name="website" value={input.website} onChange={changeEventHandler} className='border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500' />
                        </div>
                        <div>
                            <Label className='text-gray-700 font-semibold'>Location</Label>
                            <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className='border-gray-300 rounded-lg p-3 mt-1 focus:ring-2 focus:ring-blue-500' />
                        </div>
                        <div className='col-span-2'>
                            <Label className='text-gray-700 font-semibold'>Company Logo</Label>
                            <Input type="file" accept="image/*" onChange={changeFileHandler} className='border-gray-300 rounded-lg p-2 mt-1' />
                        </div>
                    </div>
                    <div className='mt-6'>
                        {loading ? (
                            <Button className="w-full bg-gray-400 text-white py-3 rounded-lg flex items-center justify-center">
                                <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                            </Button>
                        ) : (
                            <Button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700">
                                Update
                            </Button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;