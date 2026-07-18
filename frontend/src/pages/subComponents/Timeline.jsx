import axios from "axios";
import React, { useEffect, useState } from "react";

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
      <ol className="relative border-s-2 border-gradient-to-b from-cyan-500 via-purple-500 to-transparent dark:border-slate-700 pl-4 sm:pl-8">
        {timeline &&
          timeline.map((element, index) => {
            return (
              <li className="mb-8 sm:mb-10 group" key={element._id}>
                <span className="absolute flex items-center justify-center w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-br from-cyan-400 to-purple-600 rounded-full -start-4 sm:-start-5 ring-4 sm:ring-8 ring-slate-900 dark:ring-slate-900 group-hover:ring-cyan-400 transition-all duration-300 shadow-lg shadow-cyan-500/60">
                  <svg
                    className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                  </svg>
                </span>
                <div className="bg-slate-900/50 border border-slate-700 group-hover:border-cyan-400 rounded-lg p-4 sm:p-6 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-cyan-500/30">
                  <h3 className="mb-2 text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {element.title}
                  </h3>
                  <time className="block mb-3 text-xs sm:text-sm font-medium text-cyan-400">
                    {element.timeline.from} {element.timeline.to ? `- ${element.timeline.to}` : "- Present"}
                  </time>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                    {element.description}
                  </p>
                </div>
              </li>
            );
          })}
      </ol>
    </div>
  );
};

export default Timeline;