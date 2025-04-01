import React, { useEffect, useState } from 'react';
import {Label} from '@/components/ui/label';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import SpecialLoadingButton from './SpecialLoadingButton.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addTimeline, clearAllTimelineErrors, getAllTimeline, resetTimelineSlice } from '../../store/slices/timelineSlice';
import { toast } from 'react-toastify';

const AddTimeline = () => {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const dispatch = useDispatch()
  const {loading , error , message} = useSelector(state => state.timeline);

  const handleTimelineSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("title",title)
    formdata.append("description",description);
    formdata.append("from",from)
    formdata.append("to",to)
    dispatch(addTimeline(formdata));
    setTitle('')
    setDescription('')
    setFrom('')
    setTo('')
  }

  useEffect(() => {
    if(error){
      toast.error(error)
      dispatch(clearAllTimelineErrors())
    }
    if(message){
      toast.success(message)
      dispatch(resetTimelineSlice())
      dispatch(getAllTimeline())
    }
  },[dispatch , loading , error, message])

  return (
    <>
      <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14'>
        <form className='w-[100%] px-5 md:w-[650px]' onSubmit={handleTimelineSubmit}>
          <div className='space-y-12'>
            <div className='border-b border-gray-900/10 pb-12'>
              <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center'>Add a New Timeline</h2>
              <div className='mt-10 flex flex-col gap-5'>
                  <div className='w-full sm:col-span-4'>
                    <Label htmlFor='title' className='block text-sm font-medium leading-6 text-gray-900' >Title</Label>
                    <div className='mt-2'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                        <Input type="text" placeholder='Enter title...' value={title} onChange={(e) => setTitle(e.target.value)}
                        className='block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' />
                      </div>
                    </div>
                  </div>
                  <div className='w-full sm:col-span-4'>
                    <Label htmlFor='description' className='block text-sm font-medium leading-6 text-gray-900' >Description</Label>
                    <div className='mt-2'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                        <Textarea type="text" placeholder='Enter description...' value={description} onChange={(e) => setDescription(e.target.value)}
                        className='block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6' />
                      </div>
                    </div>
                  </div>
                  <div className='w-full sm:col-span-4'>
                    <Label htmlFor='to' className='block text-sm font-medium leading-6 text-gray-900' >From</Label>
                    <div className='mt-2'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                        <Input type="text" placeholder='Starting Date' value={from} onChange={(e) => setFrom(e.target.value)}
                        className='block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>
                      </div>
                    </div>
                  </div>
                  <div className='w-full sm:col-span-4'>
                    <Label htmlFor='from' className='block text-sm font-medium leading-6 text-gray-900' >To</Label>
                    <div className='mt-2'>
                      <div className='flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600'>
                        <Input type="text" placeholder='Matriculation' value={to} onChange={(e) => setTo(e.target.value)}
                        className='block flex-1 border-0  bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6'/>
                      </div>
                    </div>
                  </div>
                  {
                    loading ? (<SpecialLoadingButton content={"Processing..."} />) : (
                      <Button type='submit' className='w-full'>Add Timeline</Button>
                    )
                  }
              </div>
            </div>
          </div>

        </form>
      </div>
    </>
  );
}

export default AddTimeline;
