import React, { useEffect, useState } from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { clearAllProjectErrors, getAllProject, resetProject, updateProject } from '../../store/slices/projectSlice';

const UpdateProject = () => {

  const [title , setTitle] = useState('')
  const [description , setDescription] = useState('')
  const [gitRepoLink , setGitRepoLink] = useState('')
  const [projectLink , setProjectLink] = useState('')
  const [technologies , setTechnologies] = useState('')
  const [stack , setStack] = useState('')
  const [deployed , setDeployed] = useState(false)
  const [projectBanner , setProjectBanner] = useState('')

  const {loading , error , message} = useSelector()
  const dispatch = useDispatch()

  const handleProjectUpdate = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("title" , title)
    formData.append("description" , description)
    formData.append("gitRepoLink" , gitRepoLink)
    formData.append("projectLink" , projectLink)
    formData.append("technologies" , technologies)
    formData.append("stack" , stack)
    formData.append("deployed" , deployed)
    formData.append("projectBanner" , projectBanner)
    dispatch(updateProject(formData))
    setTitle('')
    setDescription('')
    setGitRepoLink('')
    setTechnologies('')
    setProjectLink('')
    setStack('')
    setDeployed(false)
    setProjectBanner('')
  }

  useEffect(() => {
    if(error){
      toast(error)
      dispatch(clearAllProjectErrors())
    }
    if(message){
      toast.success(message)
      dispatch(resetProject())
      dispatch(getAllProject())
    }
  },[loading , dispatch , error , message])

  return (
    <>
      
    </>
  );
}

export default UpdateProject;
