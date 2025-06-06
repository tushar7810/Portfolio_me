import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import { useNavigate } from 'react-router-dom';

const Resume = () => {
    const [resume , setResume] = useState('')

    useEffect(() => {
        try{
            const getMyResume = async() => {
            const {data} = await axios.get(
                `${process.env.BACKEND_URL}/api/v1/user/resume`,
                { withCredentials: true })
                setResume(data.requiredURL);
                // console.log(data);
            }
            // console.log(setResume);
            getMyResume();
            }catch(error){
                console.error("Error fetching resume:", error);
            }
    },[])

    const navigateTo = useNavigate();
    const handleReturnToPortfolio = () => {
        navigateTo("/");
    };

    

  return (
    <>
        <div className="flex mt-2 justify-center items-center min-h-[75vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-5">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToPortfolio}>
                  <Home size={20} />
                </Button>
              </div>
              <div className="mt-10 flex flex-col items-center gap-5 h-full">
                <div className="w-full sm:col-span-4">
                  {/* <h1 className="text-2xl font-bold mb-4">{title}</h1> */}
                  <img
                    src={resume}
                    alt="resume.jpg"
                    className="w-full h-full border-rounded-lg object-cover mb-4"
                  />
                </div>
                <Button className='w-[200px] right-0'>Download</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Resume;
