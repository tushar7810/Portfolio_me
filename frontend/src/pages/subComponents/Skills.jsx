import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/v1/skill/all`,
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);
  return (
    <div className="w-full flex flex-col gap-8 sm:gap-12">
      <h1 className="text-tubeLight-effect text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
      lg:text-[3.8rem] tracking-[15px] dancing_text mx-auto w-fit text-extrabold">
        SKILLS
      </h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {skills &&
          skills.map((element) => {
            return (
              <Card key={element._id} className="h-fit p-5 sm:p-7 flex flex-col justify-center items-center gap-3 bg-linear-to-bl from-black to-primary/15 border-primary/30 hover:border-primary/80 hover:shadow-lg hover:shadow-primary/80 transition-all duration-300 group cursor-pointer">
                <Card className="relative overflow-hidden rounded-lg bg-primary/15 p-3 group-hover:from-cyan-900/20 group-hover:to-purple-900/20 transition-colors border-none">
                  <img
                    src={element.image && element.image.url}
                    alt="skill"
                    className="h-12 sm:h-20 w-auto group-hover:scale-110 transition-transform duration-300"
                  />
                </Card>
                <p className="text-muted-foreground text-center text-sm sm:text-base font-medium group-hover:text-primary/80 transition-colors">
                  {element.title}
                </p>
              </Card>
            );
          })}
      </div>
    </div>
  );
};

export default Skills;