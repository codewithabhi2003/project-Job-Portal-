import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'
import { ChevronDown, ChevronUp } from 'lucide-react'

const filterData = [
    {
        filterType: "Location",
        array: [
            "Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai", 
            "Chennai", "Kolkata", "Ahmedabad", "Gurgaon", "Noida",
            "Telangana", "Jaipur", "Chandigarh", "Lucknow", "Indore"
        ]
    },
    {
        filterType: "Industry",
        array: [
            "Frontend Developer", "Backend Developer", "FullStack Developer",
            "Data Scientist", "Machine Learning Engineer", "Cybersecurity Specialist",
            "DevOps Engineer", "Software Engineer", "UI/UX Designer",
            "Product Manager", "Graphic Designer", "Blockchain Developer"
        ]
    },
    
]

const FilterCard = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [expandedSections, setExpandedSections] = useState(
        filterData.reduce((acc, _, index) => ({ ...acc, [index]: true }), {})
    );
    const dispatch = useDispatch();

    const toggleSection = (index) => {
        setExpandedSections(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    const changeHandler = (value) => {
        // Toggle selection if clicking the same value
        setSelectedValue(prev => prev === value ? '' : value);
    }

    useEffect(() => {
        dispatch(setSearchedQuery(selectedValue));
    }, [selectedValue, dispatch]);

    return (
        <div className='w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
            <h1 className='font-bold text-xl mb-4 text-gray-800'>Filter Jobs</h1>
            <hr className='mb-4 border-gray-200' />
            
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {filterData.map((data, index) => (
                    <div key={index} className='mb-6 last:mb-0'>
                        <div 
                            className='flex justify-between items-center cursor-pointer'
                            onClick={() => toggleSection(index)}
                        >
                            <h2 className='font-semibold text-lg text-gray-700'>
                                {data.filterType}
                            </h2>
                            {expandedSections[index] ? (
                                <ChevronUp className='h-5 w-5 text-gray-500' />
                            ) : (
                                <ChevronDown className='h-5 w-5 text-gray-500' />
                            )}
                        </div>
                        
                        {expandedSections[index] && (
                            <div className='mt-3 space-y-2 pl-1'>
                                {data.array.map((item, idx) => {
                                    const itemId = `${data.filterType}-${idx}`;
                                    return (
                                        <div key={itemId} className='flex items-center space-x-3'>
                                            <RadioGroupItem 
                                                value={item} 
                                                id={itemId}
                                                checked={selectedValue === item}
                                                className='h-4 w-4 border-gray-300 text-primary focus:ring-primary'
                                            />
                                            <Label 
                                                htmlFor={itemId} 
                                                className='text-sm font-medium text-gray-600 cursor-pointer'
                                            >
                                                {item}
                                            </Label>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                ))}
            </RadioGroup>
            
            {selectedValue && (
                <button
                    onClick={() => setSelectedValue('')}
                    className='mt-4 px-4 py-2 text-sm font-medium text-primary hover:text-primary-dark'
                >
                    Clear all filters
                </button>
            )}
        </div>
    )
}

export default FilterCard