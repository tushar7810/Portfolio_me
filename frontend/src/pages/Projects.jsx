import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Home, Github, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ProjectView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
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
        const data = await axios.get(`${process.env.BACKEND_URL}/api/v1/project/getOne/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setTitle(res.data.project.title);
          setDescription(res.data.project.description);
          setFeatures(res.data.project.features);
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
                className="rounded-lg bg-gradient-to-b from-black to-primary/40 border border-primary/20 hover:from-black hover:to-primary/50 hover:shadow-lg hover:shadow-primary/60 transition-all"
              >
                <Home size={20} className="text-primary text-bold" />
              </Button>
            </div>

            <Card className="bg-linear-to-bl from-slate-900/50 to-primary/15 border border-primary/20 rounded-xl overflow-hidden  hover:border-primary/60 transition-all hover:shadow-lg hover:shadow-cyan-500/30">
              <img
                src={
                  projectBannerPreview
                    ? projectBannerPreview
                    : "/avatarHolder.jpg"
                }
                alt="projectBanner"
                className="w-full h-auto object-cover"
              />
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-8">
                <Card className="bg-linear-to-tr from-slate-900/50 to-primary/20 border border-primary/20 rounded-lg p-6 sm:p-8 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Description</h2>
                  <ul className="list-disc list-inside space-y-3">
                    {descriptionList.map((item, index) => (
                      <li key={index} className="text-slate-300 leading-relaxed">
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className="bg-linear-to-tl from-slate-900/50 to-primary/15 border border-primary/20 rounded-lg p-6 sm:p-8 hover:border-purple-400/50 transition-all hover:shadow-lg hover:shadow-purple-500/20">
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Technologies Used</h2>
                  <div className="flex flex-wrap gap-2">
                    {technologiesList.map((tech, index) => (
                      <Badge key={index} className="bg-primary/5 text-primary/80 px-2 sm:px-1.5 py-1.5 sm:py-1 rounded-full border border-cyan-400/50 text-sm sm:text-base font-medium">
                        {tech.trim()}
                      </Badge>
                    ))}
                  </div>
                </Card>
              </div>

              <div className="space-y-4">
                <Card className="bg-linear-to-br from-slate-900/50 to-primary/15 border border-primary/20 rounded-lg p-6 hover:border-cyan-400/50 transition-all hover:shadow-lg hover:shadow-cyan-500/20">
                  <h3 className="text-lg font-bold text-white mb-3">Deployment</h3>
                  <p className="text-slate-300 text-sm">
                    <span className="font-semibold text-primary/80">Status: </span>
                    {deployed}
                  </p>
                </Card>

                <Link
                  className="w-full"
                  target="_blank"
                  to={gitRepoLink}
                >
                  <Button className="w-full mb-4 bg-slate-800 hover:bg-slate-700 border border-slate-600 hover:border-cyan-400 text-white rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-cyan-500/30 font-semibold">
                    <Github size={20} />
                    <span>Repository</span>
                  </Button>
                </Link>

                <Link
                  className="w-full"
                  target="_blank"
                  to={projectLink}
                >
                  <Button className="w-full bg-linear-to-r from-slate-800/80 to-primary/10 hover:from-slate-800/80 hover:to-primary/80 rounded-lg flex items-center justify-center gap-2 transition-all hover:shadow-lg hover:shadow-primary/50 font-semibold">
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