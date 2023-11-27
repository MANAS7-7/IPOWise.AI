'use client'

import { supabase } from "/src/utils/supabase"
import SideBar from '/src/components/SideBar';
import ChatView from '/src/components/ChatView';
import { useEffect, useState } from 'react';

export default function Chat() {

    const [modalOpen, setModalOpen] = useState(false);

    const getUserData = async () => {
        const { data: { user } } = await supabase.auth.getUser()
        console.log(user)
        if (user){
            const { data: userInfo, error } = await supabase.from('user-info').select('*').eq('user_id', user.id)
        }
        
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <div className="">
           
            <div className='flex transition duration-500 ease-in-out'>
                <SideBar />
                <ChatView />
            </div>
        </div>
    )

}