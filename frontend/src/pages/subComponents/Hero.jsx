import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { IoLogoGithub } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaXTwitter } from "react-icons/fa6";


const Hero = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(`${process.env.BACKEND_URL}/api/v1/user/me/portfolio`,
        {
          withCredentials: true
        }
      );
      setUser(data.user)
    }
    getMyProfile();
  }, [])
  return (
    <div className='w-full'>
      <div className='flex items-center gap-3 mb-4'>
        <span className='bg-green-400 rounded-full w-3 h-3 animate-pulse'></span>
        <p className='text-slate-300 font-medium'>Available to work</p>
      </div>
      <h2 className='overflow-x-hidden text-[1.5rem] sm:text-[1.9rem] md:text-[2.4rem] lg:text-[3rem] tracking-[2px] mb-2 text-white font-bold'>
        Hello, I'm <span className="text-transparent bg-clip-text bg-primary/85">
          {user.fullname}
        </span>
      </h2>
      <h2 className='text-tubeLight-effect overflow-x-hidden text-[1.5rem] sm:text-[1.9rem] md:text-[2.4rem] lg:text-[3rem] tracking-[8px] mb-6 sm:mb-8'>
        <Typewriter
          words={['Electronics and Communication Engineer', 'Full Stack Web Developer', 'YouTuber',]}
          loop={15}
          cursor
          cursorStyle='_'
          typeSpeed={70}
          deleteSpeed={70}
          delaySpeed={1000}
        />
      </h2>

      <div className="w-fit px-6 sm:px-8 py-3 bg-gradient-to-r from-black to-primary/40 border border-primary/40 rounded-full flex gap-4 
      items-center mt-6 md:mt-8 lg:mt-10 hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-primary/50">
        <Link to={"https://www.youtube.com/@Informertushar"} target="_blank" className="hover:scale-125 transition-transform">
          <FaYoutube className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        <Link to={user.instagramURL} target="_blank" className="hover:scale-125 transition-transform">
          <FaInstagram className="text-pink-500 w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        <Link to={user.facebookURL} target="_blank" className="hover:scale-125 transition-transform">
          <FaFacebook className="text-blue-600 w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        <Link to={user.linkedInURL} target="_blank" className="hover:scale-125 transition-transform">
          <IoLogoLinkedin className="text-sky-600 w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
        <Link to={user.twitterURL} target="_blank" className="hover:scale-125 transition-transform">
          <FaXTwitter className="text-slate-400 w-5 h-5 sm:w-6 sm:h-6" />
        </Link>
      </div>

      <div className="mt-6 md:mt-8 lg:mt-10 flex gap-3 flex-wrap">
        <Link to={user.githubURL} target="_blank">
          <Button className="rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-primary/60 text-white flex items-center gap-2 flex-row cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/50 font-semibold">
            <span>
              <IoLogoGithub />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to="/resume">
          <Button className="rounded-lg bg-gradient-to-l
           from-primary to-primary/50 hover:from-primary/70 hover:to-primary text-black flex items-center gap-2 flex-row cursor-pointer transition-all hover:shadow-lg hover:shadow-primary/50 font-semibold">
            <span>
              <ExternalLink size={18} />
            </span>
            <span>Resume</span>
          </Button>
        </Link>
      </div>

      <p className="mt-8 text-base sm:text-lg text-slate-300 tracking-[1px] leading-relaxed max-w-3xl">{user.aboutMe}</p>
      <hr className="my-8 md:my-10 border-slate-700" />
    </div >
  );
}

export default Hero;
