'use client'
import React from 'react'
import { BsHouseFill, BsBellFill } from 'react-icons/bs'
import { FaUser } from 'react-icons/fa'
import { BiLogOut } from 'react-icons/bi'

import useCurrentUser from '../hooks/useCurrentUser'

import SidebarTweetButton from './SidebarTweetButton'
import SidebarLogo from './SidebarLogo'
import SidebarItem from './SidebarItem'
import { signOut } from 'next-auth/react'

const Sidebar = () => {
    const { data: currentUser } = useCurrentUser();

    const items = [
        {
            label: 'Home',
            href: '/',
            icon: BsHouseFill
        },
        {
            label: 'Notifications',
            href: '/notifications',
            icon: BsBellFill
        },
        {
            label: 'Profile',
            href: '/users/0001',
            icon: FaUser
        }
    ]

    return (
        <div className='flex flex-col items-end'>
            <div className='space-y-2 lg:w-[230px]'>
                <SidebarLogo />
                {items.map((item) => (
                    <SidebarItem
                        key={item.href}
                        href={item.href}
                        label={item.label}
                        icon={item.icon}
                    />)
                )}
                {currentUser && (
                    <SidebarItem onClick={() => signOut()} label='Logout' icon={BiLogOut} href='/logout' />
                )}
                <SidebarTweetButton />

            </div>
        </div>

    )
}

export default Sidebar