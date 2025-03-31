"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'

function Header() {

  const {user, isSignedIn}=useUser();
  return (
    <div className='p-5 flex justify-between items-center border shadow-sm'>
        <Image src={'./logo.svg'}
        alt='logo'
        width={150}
        height={90}
        />
        {isSignedIn?
        <UserButton/>:
        <Link href={'/sign-in'}>
          <Button>Login/Sign Up</Button>
        </Link>
      }
        
    </div>
  )
}

export default Header