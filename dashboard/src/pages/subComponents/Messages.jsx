import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import SpecialLoadingButton from './SpecialLoadingButton.jsx';
import { Trash2 } from 'lucide-react';
import { clearAllMessagesErrors, deleteMessage, getAllMessages, resetMessageSlice } from '../../store/slices/messaegsSlice.js';
import {toast} from 'react-toastify'

const Messages = () => {

  const navigateTo = useNavigate()
  const dispatch = useDispatch()
  const { loading , messages , error , message } = useSelector((state) => state.messages)

  const handleDashboard = () => {
    // e.preventDefault();
    navigateTo('/')
  };

  const handleMessageDelete = (id) => {
    setMessageId(id)
    dispatch(deleteMessage(id))
  }

  useEffect(() => {
    if(error) {
      toast.error(error)
      dispatch(clearAllMessagesErrors())  
    }
    if(message) {
      toast.success(message)
      dispatch(resetMessageSlice())
      dispatch(getAllMessages())
    }
  },[  dispatch , loading , error , message])

 

  const [messageId , setMessageId] = useState('')


  return (
    <>
      <div className='min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-20 sm:pr-6'>
          <Tabs>
            <TabsContent>
              <Card>
                <CardHeader className='flex gap-4 sm:justify-between sm:flex-row sm:items-center'>
                  <CardTitle>Messages</CardTitle>
                </CardHeader>
                <CardContent className='grid sm:grid-cols-2 gap-4 '>
                  {
                    messages && messages.length > 0 ? (
                      messages.map((element) => {
                        return (
                          <Card key={element._id} className='grid gap-2'>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2' >Sender Name :</span>
                                {element.senderName}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2' >Email :</span>
                                {element.email}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2' >Subject :</span>
                                {element.subject}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2' >Message :</span>
                                {element.message}
                              </CardDescription>
                              <CardDescription className='text-slate-950' >
                                <span className='font-bold mr-2'>Sent on :</span>
                                {element.createdAt}
                              </CardDescription>
                              <CardFooter className='justify-end' >
                                {
                                  loading && (messageId === element._id) ? 
                                  (<SpecialLoadingButton content={"Deleting"} width={"w-32"} />) : (
                                    <Button className="w-32" onClick={() => handleMessageDelete(element._id)} ><Trash2 />Delete</Button>
                                  )
                                }
                              </CardFooter>
                          </Card>
                        )
                      })
                    ) : <CardHeader>No message found!</CardHeader>
                  }
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
      </div>
    </>
  );
}

export default Messages;
