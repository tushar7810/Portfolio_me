import React from 'react';
import {Card} from '@/components/ui/card'

const About = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative mb-12">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
           <span className="text-tubeLight-effect ">ABOUT ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-8 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center mb-8 sm:mb-12">
        <p className="uppercase text-base sm:text-lg text-slate-400 tracking-[2px] font-medium">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-16 md:my-20 gap-12 lg:gap-16">
          <div className="flex justify-center items-center">
            <Card className="bg-linear-to-tl from-black to-primary/50 rounded-xl overflow-hidden border-1 border-primary/50 hover:border-primary/60 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 p-3 sm:p-4 bg-slate-900/50">
              <img
                src="/profile.jpg"
                alt="avatar"
                className="rotate-[0deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px] rounded-lg"
              />
            </Card>
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-base sm:text-lg gap-5 sm:gap-6">
            <p className="text-slate-300 leading-relaxed">
              My name is Tushar Sil. I am persuing B.Tech in Electronics and Communication 
              Engineering department form Academy of Technology. I work as
              a full stack web developer. But my interest of field is Backend Development. 
            </p>
            <p className="text-slate-300 leading-relaxed">
              I have interests not only in technology but also in my 
              core subjects like Electromagnetic Theory, Control System etc. I excel in meeting deadlines for
              my work.
            </p>
          </div>
        </div>
        <Card className="bg-gradient-to-r from-slate-900/50 to-primary/25 border-primary/15 rounded-xl p-6 sm:p-8 hover:border-primary/70 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20">
          <p className="tracking-[1px] text-base sm:text-lg text-slate-300 leading-relaxed">
            My dedication and perseverance in timely delivery of work are integral
            to me. I maintain the courage to face any challenges for extended
            periods.
          </p>
        </Card>
      </div>
    </div>
  );
}

export default About;
