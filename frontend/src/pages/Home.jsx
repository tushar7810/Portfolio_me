import React from 'react';
import Hero from './subComponents/Hero.jsx';
import Timeline from './subComponents/Timeline.jsx';
import About from './subComponents/About.jsx';
import Skills from './subComponents/Skills.jsx';
import Portfolio from './subComponents/Portfolio.jsx';
import MyApps from './subComponents/MyApps.jsx';
import Contact from '../pages/subComponents/Contact.jsx';

const Home = () => {
  return (
    <article className='px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14'>
      <Hero />
      <About />
      <Timeline />
      <Portfolio />
      <Skills />
      <MyApps />
      <Contact />  
    </article>
  );
}

export default Home;
