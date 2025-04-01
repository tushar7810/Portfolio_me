import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Home } from 'lucide-react';
import { toast } from 'react-toastify';

const ViewProject = () => {
    const [title , setTitle] = useState('')
    const [description , setDescription] = useState('')
    const [gitRepoLink , setGitRepoLink] = useState('')
    const [projectLink , setProjectLink] = useState('')
    const [technologies , setTechnologies] = useState('')
    const [stack , setStack] = useState('')
    const [deployed , setDeployed] = useState(false)
    const [projectBanner , setProjectBanner] = useState('')

    const {id} = useParams()

    useEffect(() => {
      const getProject = async() => {
        await axios.get(`/api/v1/project/getOne/${id}`,
          {
            withCredentials: true
          }
        )
        .then((res) => {
          setTitle(res.data.project.title)
          setDescription(res.data.project.description)
          setStack(res.data.project.stack)
          setDeployed(res.data.project.deployed)
          setTechnologies(res.data.project.technologies)
          setGitRepoLink(res.data.project.gitRepoLink)
          setProjectBanner(res.data.project.projectBanner && res.data.project.projectBanner.url)
          setProjectLink(res.data.project.projectLink)
        })
        .catch((error) => {
          toast.error(error.response.data.message)
        })
      }
      getProject()
    },[id])

    const navigateTo = useNavigate()
    const handleReturnToDashboard = () => {
      navigateTo('/')
    }

    const descriptionList = description.split(" -" && ". ")
    const technologiesList = technologies.split(", ")

  return (
    <>
       <div className="flex mt-7 justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4">
        <div className="w-[100%] px-5 md:w-[1000px] pb-5">
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="flex justify-end">
                <Button onClick={handleReturnToDashboard}>
                  <Home />
                </Button>
              </div>
              <div className="mt-10 flex flex-col gap-5">
                <div className="w-full sm:col-span-4">
                  <h1 className="text-2xl font-bold mb-4 text-black">{title}</h1>
                  <img
                    src={
                      projectBanner
                        ? projectBanner
                        : "/avatarHolder.jpg"
                    }
                    alt="projectBanner"
                    className="w-full h-auto"
                  />
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Description:</p>
                  <ul className="list-disc text-black">
                    {descriptionList.map((item, index) => (
                      <li key={index} >{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl font-bold mb-2 ">Technologies:</p>
                  <ul className="list-disc text-black">
                    {technologiesList.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Stack:</p>
                  <p className='text-black'>{stack}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Deployed:</p>
                  <p className='text-black'>{deployed}</p>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Github Repository Link:</p>
                  <Link
                    className="text-sky-700"
                    target="_blank"
                    to={gitRepoLink}
                  >
                    {gitRepoLink}
                  </Link>
                </div>
                <div className="w-full sm:col-span-4">
                  <p className="text-2xl mb-2 font-bold">Project Link:</p>
                  <Link
                    className="text-sky-700"
                    target="_blank"
                    to={projectLink}
                  >
                    {projectLink}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewProject;
