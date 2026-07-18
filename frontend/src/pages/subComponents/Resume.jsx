import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Home, Download } from "lucide-react";
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
            }
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
        <div className="flex mt-7 justify-center items-center min-h-[80vh] sm:gap-4 sm:py-4">
          <div className="w-[100%] px-5 md:w-[1000px] pb-5">
            <div className="space-y-8">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">My Resume</h1>
                <Button 
                  onClick={handleReturnToPortfolio}
                  className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 hover:shadow-lg hover:shadow-cyan-500/60 transition-all"
                >
                  <Home size={20} />
                </Button>
              </div>

              <div className="rounded-xl overflow-hidden border-2 border-slate-700 hover:border-cyan-400 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 bg-slate-900/50">
                <img
                  src={resume}
                  alt="resume"
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="flex justify-center">
                <a href={resume} download="xkm0cpkvmry67x3qnnw5.jpg" target='_self' className="w-full sm:w-auto">
                  <Button className='w-full sm:w-56 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-cyan-500/60 font-semibold'>
                    <Download size={20} />
                    <span>Download Resume</span>
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}

export default Resume;
