import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Link, useNavigate } from 'react-router-dom';
import SpecialLoadingButton from "./SpecialLoadingButton"
import {toast} from 'react-toastify'
import { updatePassword } from '../../store/slices/userSlice';

const UpdatePassword = () => {

  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')
  const {loading, error, isUpdated, message} = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handlePasswordUpdate =(e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append('currentPassword', currentPassword)
    formData.append('newPassword', newPassword)
    formData.append('confirmNewPassword', confirmNewPassword)
    dispatch(updatePassword(currentPassword, newPassword, confirmNewPassword))
  }

  useEffect(() => {
    if(error){
      toast.error(error)
    }
    if(isUpdated){
      toast.success(message)
    }
  }, [dispatch, isUpdated, error, loading])

  return (
    <>
      <div className='w-full h-full'>
        <div>
          <div className='grid w-[100%] gap-6'>
            <div className='grid gap-2'>
              <h1 className='text-3xl font-bold'> Update Password</h1>
              <p className='mb-5'>Update your password</p>
            </div>
          </div>
          <div className='grid gap-6'>
            
            <div className='grid gap-2'>
              <Label>Current Password</Label>
              <Input type="text" 
                placeholder="Enter Current Password"
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label>New Password</Label>
              <Input type="text" 
                placeholder="Enter New Password"
                value={newPassword} 
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className='grid gap-2'>
              <Label>Confirm Password</Label>
              <Input type="text" 
                placeholder="Enter confirm Password"          
                value={confirmNewPassword} 
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            
            <div className='grid gap-2'>
              {
                loading ? <SpecialLoadingButton content={"Updating..."} />: <Button className='w-full' onClick={handlePasswordUpdate} >Update Password</Button>
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
