import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error('Company name cannot be empty');
            return;
        }
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                navigate(`/admin/companies/${res.data.company?._id}`);
            }
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-8 mt-10'>
                <div className='mb-6'>
                    <h1 className='font-extrabold text-3xl text-gray-900'>Create Your Company</h1>
                    <p className='text-gray-600 mt-2'>Enter a unique name for your company. You can change it later if needed.</p>
                </div>
                <div className='mb-4'>
                    <Label className='text-gray-700 text-sm font-semibold'>Company Name</Label>
                    <Input
                        type="text"
                        className="w-full border border-gray-300 rounded-lg p-3 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="JobHunt, Microsoft, etc."
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                    />
                </div>
                <div className='flex items-center gap-4 mt-6'>
                    <Button variant='outline' className="px-6 py-2 border-gray-500 hover:bg-gray-100" onClick={() => navigate('/admin/companies')}>Cancel</Button>
                    <Button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={registerNewCompany}>Continue</Button>
                </div>
            </div>
        </div>
    );
};

export default CompanyCreate;