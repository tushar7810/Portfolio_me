import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Home, Github, ExternalLink } from "lucide-react";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectBanner, setProjectBanner] = useState("");
  const [projectBannerPreview, setProjectBannerPreview] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const getProject = async () => {
        const {data} = await axios.get(`${process.env.BACKEND_URL}/api/v1/project/getOne/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setStack(res.data.project.stack);
          setDeployed(res.data.project.deployed);
          setTechnologies(res.data.project.technologies);
          setGitRepoLink(res.data.project.gitRepoLink);
          setProjectLink(res.data.project.projectLink);
          setProjectBanner(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
          setProjectBannerPreview(
            res.data.project.projectBanner && res.data.project.projectBanner.url
          );
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    };
    getProject();
  }, [id]);

  const descriptionList = description.split(". ");
  const technologiesList = technologies.split(", ");

  const navigateTo = useNavigate();
  const handleReturnToPortfolio = () => {
    navigateTo("/");
  };

  return (
    <>
      <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-8 sm:space-y-12">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">{title}</h1>
                <p className="text-slate-400 text-base sm:text-lg">{stack}</p>
              </div>
              <Button 
                onClick={handleReturnToPortfolio}
                className="rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 hover:shadow-lg hover:shadow-cyan-500/60 transition-all"
              >
                <Home size={20} />
              </Button>
            </div>

            <div className="rounded-xl overflow-hidden border border-slate-700 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/30">
              <img
                src={
                  projectBannerPreview
                    ? projectBannerPreview
                    : "/avatarHolder.jpg"
                }
                alt="projectBanner"
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-8">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 sm:p-8 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Description</h2>
                  <ul className="list-disc list-inside space-y-3">
                    {descriptionList.map((item, index) => (
                      <li key={index} className="text-slate-300 leading-relaxed">
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 sm:p-8 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2">
                    {technologiesList.map((tech, index) => (
                      <span key={index} className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-cyan-400/50 text-sm sm:text-base font-medium">
                        {tech.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                  <h3 className="text-lg font-bold text-white mb-3">Deployment</h3>
                  <p className="text-slate-300 text-sm">
                    <span className="font-semibold text-cyan-300">Status: </span>
                    {deployed}
                  </p>
                </div>

                <Link
                  className="w-full"
                  target="_blank"
                  to={gitRepoLink}
                >
                  <Button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400 text-white rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-cyan-500/30 font-semibold">
                    <Github size={20} />
                    <span>Repository</span>
                  </Button>
                </Link>

                <Link
                  className="w-full"
                  target="_blank"
                  to={projectLink}
                >
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-cyan-500/60 font-semibold">
                    <ExternalLink size={20} />
                    <span>View Live</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectView;