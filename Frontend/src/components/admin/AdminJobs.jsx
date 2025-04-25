import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

import { useNavigate } from 'react-router-dom';

import { Search, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';

const AdminJobs= () => {
 useGetAllAdminJobs();
  const[input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch =useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));

  },[input]);

  return (
    <div>
      <Navbar />
      <div className='max-w-6xl mx-auto my-10'>
        {/* Align Search & Button to the right */}
        <div className='flex justify-end my-5'>
          <div className='flex items-center gap-4'>
            {/* Search Box */}
            <div className='relative w-72'>
              <Search className='absolute left-3 top-2.5 text-gray-400 w-5 h-5' />
              <Input 
                className='pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 w-full shadow-sm' 
                placeholder='Search by name...'
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            {/* New Company Button */}
            <Button 
              onClick={() => navigate('/admin/jobs/create')} 
              className='bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-md'
            >
              <Plus className='w-5 h-5' />
              New Jobs
            </Button>
          </div>
        </div>
        {/* Companies Table */}
        <AdminJobsTable/>
      </div>
    </div>
  );
};

export default AdminJobs;