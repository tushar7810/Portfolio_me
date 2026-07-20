import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  useEffect(() => {
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/v1/timeline/getall`,
        { withCredentials: true }
      );
      setTimeline(data.timelines);
    };
    getMyTimeline();
  }, []);
  return (
    <div>
      <h1 className="text-tubeLight-effect overflow-x-hidden text-[2rem] sm:text-[2.75rem] md:text-[3rem] lg:text-[3.8rem] mb-8 sm:mb-12 font-extrabold">Timeline</h1>
      <ol className="relative border-s-2 border-gradient-to-b from-slate-700 via-primary to-transparent dark:border-slate-700 pl-4 sm:pl-8">
        {timeline &&
          timeline.map((element, index) => {
            return (
              <li className="mb-8 sm:mb-10 group" key={element._id}>
                <span className="absolute flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-slate-800 to-primary/30 rounded-full -start-4 sm:-start-5 ring-4 sm:ring-8 ring-slate-900 dark:ring-slate-800 group-hover:ring-primary/60 transition-all duration-300 shadow-lg shadow-cyan-500/60">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-primary/90 group-hover:text-primary/70 transition-all duration-300"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <Card className="bg-linear-to-bl from-black to-primary/25 border border-primary/50 group-hover:border-primary/80 rounded-lg p-2 sm:p-4 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/40">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-primary/90 *:transition-all">
                    {element.title}
                  </h3>
                  <time className="block text-xs sm:text-sm font-medium text-primary/90">
                    {element.timeline.from} {element.timeline.to ? `- ${element.timeline.to}` : "- Present"}
                  </time>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {element.description}
                  </p>
                </Card>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default Timeline;