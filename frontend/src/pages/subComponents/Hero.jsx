import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typewriter } from 'react-simple-typewriter';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {ExternalLink} from 'lucide-react';
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
      <div className='flex items-center gap-2 mb-2'>
        <span className='bg-green-400 rounded-full w-2 h-2'></span>
        <p>Online</p>
      </div>
      <h2 className='overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4'>
        Hello I'm {user.fullname}
      </h2>
      <h2 className='text-tubeLight-effect overflow-x-hidden text-[1.3rem] sm:text-[1.7rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]'>
        <Typewriter
          words={['student', 'Full Stack Developer', 'YouTuber',]}
          loop={15}
          cursor
          cursorStyle='_'
          typeSpeed={70}
          deleteSpeed={70}
          delaySpeed={1000}
        />
      </h2>
      <div className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5 
      items-center mt-4 md:mt-8 lg:mt-10">
        <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
          <FaYoutube className="text-red-500 w-7 h-7" />
        </Link>
        <Link to={user.instagramURL} target="_blank">
          <FaInstagram className="text-pink-500 w-7 h-7" />
        </Link>
        <Link to={user.facebookURL} target="_blank">
          <FaFacebook className="text-blue-800 w-7 h-7" />
        </Link>
        <Link to={user.linkedInURL} target="_blank">
          <IoLogoLinkedin className="text-sky-600 w-7 h-7" />
        </Link>
        <Link to={user.twitterURL} target="_blank">
          <FaXTwitter className="text-black w-7 h-7" />
        </Link>
      </div>
      <div className="mt-4 md:mt-8 lg:mt-10  flex gap-3">
        <Link to={user.githubURL} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row cursor-pointer">
            <span>
              <IoLogoGithub />
            </span>
            <span>Github</span>
          </Button>
        </Link>
        <Link to={user.resume && user.resume.url} target="_blank">
          <Button className="rounded-[30px] flex items-center gap-2 flex-row cursor-pointer">
            <span>
              <ExternalLink />
            </span>
            <span>Resume </span>
          </Button>
        </Link>
      </div>
      <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>
      <hr className="my-8 md::my-10 " />
    </div >
  );
}

export default Hero;
