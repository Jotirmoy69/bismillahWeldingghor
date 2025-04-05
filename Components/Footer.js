import React from 'react'
import Link from 'next/link'
const Footer = () => {
  return (
    <footer>
      <div className='w-full h-16 bg-[#BBEEFF] md:px-10 px-4 flex items-center justify-between font-[valorant] md:text-2xl text-xs'>
        <h1>Bismillah Welding Ghor™</h1>
        <h1>All rights reserved || Copyright <span> <Link href={"/login"}>©</Link></span> 2025</h1>

      </div>
    </footer>
  )
}

export default Footer
