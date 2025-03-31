"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react'
import { UserButton } from '@clerk/nextjs'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

function SideNav() {
    const menuList=[
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Budgets',
            icon:PiggyBank,
            path:'/dashboard/budgets'
        },
        {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path:'/dashboard/expenses'
        },
        {
            id:4,
            name:'Upgrade',
            icon:ShieldCheck,
            path:'/dashboard/upgrade'
        }
    ]
    const path=usePathname();

    useEffect(() => {
        console.log(path)
    },[path])
  return (
    <div className='h-screen p-5 border shadow-sm'>
        <Image src='/logo.svg' alt='logo' width={150} height={900}/>
        <div className='mt-5'>
            {menuList.map((menu, index) => (
                <Link href={menu.path} key={index}>
                <h2 className={`flex gap-2 items-center text-gray-500 font-medium p-5 mb-2 cursor-pointer rounded-md hover:text-primary hover:bg-violet-100 ${(path === menu.path || (menu.path === '/dashboard/expenses' && path.startsWith('/dashboard/expenses/'))) &&'text-primary bg-violet-100'}`}>
                {/* For highlighting expenses in sidnav */}
                    <menu.icon/>
                    {menu.name}
                </h2>
                </Link>
            ))}
        </div>
        <div className='fixed bottom-10 p-5 flex gap-2 items-center text-gray-500 font-medium cursor-pointer rounded-md hover:text-primary hover:bg-violet-100'>
            <UserButton/>
            Profile
        </div>
    </div>
  )
}

export default SideNav