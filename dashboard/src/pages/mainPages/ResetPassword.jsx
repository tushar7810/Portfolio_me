import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { toast } from 'react-toastify';
import SpecialLoadingButton from '../subComponents/SpecialLoadingButton';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearAllForgotPasswordErrors, resetPassword } from '../../store/slices/forgetResetSlice';
import { getUser } from '../../store/slices/userSlice';

const ResetPassword = () => {
  const {token} = useParams()
  const [password , setPassword] = useState('')
  const [confirmPassword , setConformPassword] =useState('')
  const {loading,error,message} = useSelector((state) => state.forgotPassword)
  const {isAuthenticated} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleResetPassword = () => {
    dispatch(resetPassword(token,password , confirmPassword))
  }

  useEffect(() => {
    if(error){
      toast.error(error);
      dispatch(clearAllForgotPasswordErrors())
    }
    if(isAuthenticated){
      navigateTo('/')
    }
    if(message !== null){
      toast.success(message)
      dispatch(getUser())
    }
  },[dispatch , isAuthenticated , error , message])
  return (
    <>
      <form className={cn("flex flex-col gap-8")} onSubmit={handleResetPassword}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold"><span className="text-[#1a1a1a]">Reset</span> Password</h1>
        <p className="text-balance text-sm text-black">
          Enter the following details
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="text" placeholder="Enter new password" className='text-black' required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" value={confirmPassword} onChange={(e) => setConformPassword(e.target.value)} type="password" placeholder="confirm new password" className='text-black' required />
        </div>
        {
          loading ? <SpecialLoadingButton content={"Resetting password"}/> : <Button type="submit" className="w-full">
          Reset Password
        </Button>
        }
      </div>
    </form>
    </>
  );
}

export default ResetPassword;
