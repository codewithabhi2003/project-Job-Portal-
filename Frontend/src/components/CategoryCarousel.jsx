import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice'; // ✅ Added missing import

const categories = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Graphic Designer",
  "UI/UX Designer",
  "DevOps Engineer",
  "Cybersecurity Specialist",
  "Product Manager",
  "Software Engineer",
  "Mobile App Developer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full max-w-xl mx-auto my-10">
      <Carousel>
        <CarouselContent className="flex items-center gap-2">
          {categories.map((cat, index) => (
            <CarouselItem key={index} className="min-w-[160px] max-w-[200px] flex justify-center flex-shrink-0">
              <Button 
                onClick={() => searchJobHandler(cat)}
                className="bg-[#F3FAF6] text-[#6A38C2] px-4 py-2 rounded-lg w-full hover:bg-[#e0f2eb]"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;

