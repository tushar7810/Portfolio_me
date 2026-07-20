import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        `${process.env.BACKEND_URL}/api/v1/project/allProject`,
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);
  return (
    <div>
      <div className="relative mb-12">
        <h1
          className="hidden sm:flex gap-4 items-center text-[2rem] sm:text-[2.75rem] md:text-[3rem] 
          lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] tracking-[15px] 
          mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY{" "}
          <span className="text-tubeLight-effect font-extrabold">
            Projects
          </span>
        </h1>
        <h1
          className="flex sm:hidden gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] lg:leading-[90px] 
          tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          MY <span className="text-tubeLight-effect font-extrabold">WORK</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {viewAll
          ? projects &&
            projects.map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <Card className="overflow-hidden group cursor-pointer h-full bg-gradient-to-br from-slate-900/50 to-primary/15 border-primary/30 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/60">
                    <div className="relative overflow-hidden">
                      <img
                        src={element.projectBanner && element.projectBanner.url}
                        alt={element.title}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex items-center gap-2 text-white">
                          <span>View Project</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                    <Card className="p-4 sm:p-5 border border-primary/30 group-hover:bg-primary/20 transition-colors">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary/50 transition-colors">
                        {element.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                        {element.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {element.technologies && element.technologies.split(", ").slice(0, 3).map((tech, idx) => (
                          <Badge key={idx} className="text-xs bg-gradient-to-r from-black to-primary/70 text-white px-2 py-1 rounded border border-primary/50">
                            {tech}
                          </Badge>
                        ))}
                        {element.technologies && element.technologies.split(", ").length > 3 && (
                          <span className="text-xs text-slate-400">+{element.technologies.split(", ").length - 3} more</span>
                        )}
                      </div>
                    </Card>
                  </Card>
                </Link>
              );
            })
          : projects &&
            projects.slice(0, 9).map((element) => {
              return (
                <Link to={`/project/${element._id}`} key={element._id}>
                  <Card className="overflow-hidden group cursor-pointer h-full bg-linear-to-br from-black to-primary/25 border-primary/35 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/60">
                    <div className="relative overflow-hidden">
                      <img
                        src={element.projectBanner && element.projectBanner.url}
                        alt={element.title}
                        className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                        <div className="flex items-center gap-2 text-white">
                          <span>View Project</span>
                          <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary/70 transition-colors">
                        {element.title}
                      </h3>
                      <p className="text-sm text-slate-400 line-clamp-2 mb-3">
                        {element.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {element.technologies && element.technologies.split(", ").slice(0, 3).map((tech, idx) => (
                          <span key={idx} className="text-xs bg-primary/20 text-white px-2 py-1 rounded-full border border-primary/20">
                            {tech}
                          </span>
                        ))}
                        {element.technologies && element.technologies.split(", ").length > 3 && (
                          <span className="text-xs text-slate-400">+{element.technologies.split(", ").length - 3} more</span>
                        )}
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
      </div>
      {projects && projects.length > 9 && (
        <div className="w-full text-center my-9">
          <Button className="w-52 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 hover:shadow-lg hover:shadow-cyan-500/60 transition-all" onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "Show Less" : "Show More"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Portfolio;