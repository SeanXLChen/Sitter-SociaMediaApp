'use client'
import React from 'react'
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    label: string;
    showBackArrow?: boolean;
}

const Header: React.FC<HeaderProps> = ({ label, showBackArrow }) => {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    }

    return (
        <div className='border-b-[1px] border-neutral-800 p-5'>
            <div className='flex flex-row items-center gap-2'>
                {
                    showBackArrow && (
                        <BiArrowBack
                            className='cursor-pointer hover:opacity-70 transition'
                            color="white"
                            size={20}
                            onClick={handleBack}
                        />)
                }
                <h1 className='text-white text-xl font-semibold'>{label}</h1>

            </div>
        </div>
    )
}

export default Header