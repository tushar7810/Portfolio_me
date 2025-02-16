import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { clearAllForgotPasswordErrors, forgotPassword } from '../../store/slices/forgetResetSlice';
import SpecialLoadingButton from '../subComponents/SpecialLoadingButton';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email , setEmail] = useState('')
  const {loading , error, message} = useSelector((state) => state.forgotPassword)
  const {isAuthenticated} = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigateTo = useNavigate()

  const handleForgotPAssword = () => {
    dispatch(forgotPassword(email))
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
    }
  },[dispatch,isAuthenticated,error , loading])
  return (
    <>
      <form className={cn("flex flex-col gap-8")} onSubmit={handleForgotPAssword}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold"><span className="text-[#1a1a1a]">Login</span> to your account</h1>
        <p className="text-balance text-sm text-black">
          Enter your email to request 'Reset Password'
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="m@example.com" className='text-black' required />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Link to={"/login"} className="ml-auto text-sm underline-offset-4 hover:underline">
              remember your password?
            </Link>
          </div>
        </div>
        {
          loading ? <SpecialLoadingButton content={"Requesting"}/> : <Button type="submit" className="w-full">
          Reset Password
        </Button>
        }
      </div>
    </form>
    </>
  );
}

export default ForgotPassword;
