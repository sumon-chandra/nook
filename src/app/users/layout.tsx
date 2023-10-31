import React from 'react'
import { ReactNode } from 'react';
import Sidebar from '../components/sidebar/Sidebar';
import getUsers from '../actions/getUsers';
import UserList from './componentes/UserList';

const UsersLayout = async ({ children }: { children: ReactNode }) => {
    const users = await getUsers()
    // console.log("users" + users.length);

    return (
        <Sidebar>
            <div className='h-full'>
                <UserList items={users} />
                {children}
            </div>
        </Sidebar>
    )
}

export default UsersLayout
