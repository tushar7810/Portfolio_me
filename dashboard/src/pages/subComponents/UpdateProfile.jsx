import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Link, useNavigate } from 'react-router-dom';
import SpecialLoadingButton from "./SpecialLoadingButton"
import {toast} from 'react-toastify'
import { getUser, resetProfile, updateProfile , clearAllUserErrors } from '../../store/slices/userSlice';

const UpdateProfile = () => {
  const { user, loading, error, isUpdated, message } = useSelector((state) => state.user)
  const [fullname, setFullname] = useState(user && user.fullname)
  const [email, setEmail] = useState(user && user.email)
  const [phone, setPhone] = useState(user && user.phone)
  const [aboutMe, setAboutMe] = useState(user && user.aboutMe)
  const [portfolio, setPortfolio] = useState(user && (user.portfolio === "undefined" ? "" : user.portfolio))
  const [linkedInURL, setLinkedInURL] = useState(user && (user.linkedInURL === "undefined" ? "" : user.linkedInURL))
  const [githubURL, setGithubURL] = useState(user && (user.githubURL === "undefined" ? "" : user.githubURL))
  const [instagramURL, setInstagramURL] = useState(user && (user.instagramURL === "undefined" ? "" : user.instagramURL))
  const [twitterURL, setTwitterURL] = useState(user && (user.twitterURL === "undefined" ? "" : user.twitterURL))
  const [facebookURL, setFacebookURL] = useState(user && (user.facebookURL === "undefined" ? "" :  user.facebookURL))
  const [avatar, setAvatar] = useState(user && user.avatar && user.avatar.url)
  const [avatarPreview, setAvatarPreview] = useState(user && user.avatar && user.avatar.url)
  const [resume, setResume] = useState(user && user.resume && user.resume.url)
  const [resumePreview, setResumePreview] = useState(user && user.resume && user.resume.url)

  const dispatch = useDispatch()

  const avaterHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setAvatarPreview(reader.result)
      setAvatar(file)
    }
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setResumePreview(reader.result)
      setResume(file)
    }
  }

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    const formdata = new FormData()
    formdata.append('fullname', fullname)
    formdata.append('email', email)
    formdata.append('phone', phone)
    formdata.append('aboutMe', aboutMe)
    formdata.append('portfolio', portfolio)
    formdata.append('linkedInURL', linkedInURL)
    formdata.append('githubURL', githubURL)
    formdata.append('instagramURL', instagramURL)
    formdata.append('twitterURL', twitterURL)
    formdata.append('facebookURL', facebookURL)
    formdata.append('avatar', avatar)
    formdata.append('resume', resume)

    dispatch(updateProfile(formdata))
  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearAllUserErrors())
    }
    if(isUpdated){
      dispatch(getUser())
      dispatch(resetProfile())
    }
    if(message){
      toast.success(message)
    }
  },[dispatch , loading ,error , isUpdated,message ])

  return (
    <>
      <div className='w-full h-full'>
        <div>
          <div className='grid w-[100%] gap-6'>
            <div className='grid gap-2'>
              <h1 className='text-3xl font-bold'> Update Profile</h1>
              <p className='mb-5'>Update your profile</p>
            </div>
          </div>
          <div className='grid gap-6'>
            <div className='flex flex-start lg:justify-between lg:items-center flex-col lg:flex-row gap-5'>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Profile Image</Label>
                <img
                  src={avatarPreview ? `${avatarPreview}` : `./vite.svg`}
                  alt="avatar"
                  className='w-full h-auto sm:w-72 sm:h-72 rounded 2xl'
                />
                <div className='relative'>
                  <input 
                    type="file" 
                    className='avatar-update-btn' 
                    onChange={avaterHandler} 
                  />
                </div>
              </div>
              <div className='grid gap-2 w-full sm:w-72'>
                <Label>Resume</Label>
                <Link to={user && user.resume && user.resume.url} target="_blank">
                  <img
                    src={resumePreview ? `${resumePreview}` : `./vite.svg`}
                    alt="resume"
                    className='w-full h-auto sm:w-72 sm:h-72 rounded 2xl'
                  />
                </Link>
                <div className='relative'>
                  <input 
                    type="file" 
                    className='avatar-update-btn' 
                    onChange={resumeHandler} 
                  />
                </div>
              </div>
            </div>

            <div className='grid gap-2'>
              <Label>Full Name</Label>
              <Input type="text" 
                placeholder="full name" 
                value={fullname} 
                onChange={(e) => setFullname(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label>Email</Label>
              <Input type="email"
                placeholder="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Phone</Label>
              <Input type="text"   
                placeholder="phone no" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>About me</Label>
              <Textarea  
                placeholder="please write about yourserf" 
                value={aboutMe} 
                onChange={(e) => setAboutMe(e.target.value)} 
             />
            </div>
            <div className='grid gap-2'>
              <Label>Portfolio URL</Label>
              <Input  
                placeholder="enter your portfolio url" 
                value={portfolio} 
                onChange={(e) => setPortfolio(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>GitHub Url</Label>
              <Input  
                placeholder="enter your github url" 
                value={githubURL} 
                onChange={(e) => setGithubURL(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>LinkedIn Url</Label>
              <Input  
                placeholder="enter your linkedIn url" 
                value={linkedInURL} 
                onChange={(e) => setLinkedInURL(e.target.value)} 
              />
            </div>
            <div className='grid gap-2'>
              <Label>Instagram Url</Label>
              <Input  
                placeholder="enter your Instagram url" 
                value={instagramURL} 
                onChange={(e) => setInstagramURL(e.target.value)}  
              />
            </div>
            <div className='grid gap-2'>
              <Label>Twitter Url</Label>
              <Input  
                placeholder="enter your Twitter url" 
                value={twitterURL} 
                onChange={(e) => setTwitterURL(e.target.value)}  
              />
            </div>
            <div className='grid gap-2'>
              <Label>Facebook Url</Label>
              <Input  
                placeholder="enter your Facebook url" 
                value={facebookURL} 
                onChange={(e) => setFacebookURL(e.target.value)}  
              />
            </div>
            <div className='grid gap-2'>
              {
                loading ? <SpecialLoadingButton content={"Updating..."} />: <Button className='w-full' onClick={handleProfileUpdate} >Update Profile</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateProfile;
