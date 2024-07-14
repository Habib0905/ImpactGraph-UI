import React from 'react'

const Hero = () => {
  return (
    <div className='w-full h-screen relative'> 
    <video  className='w-full h-full object-cover' src='bg.mp4' autoPlay  
    loop muted />
     
     <div className="absolute w-full h-full top-0 left-0 bg-gray-900/30">
     <div className="absolute w-full h-full flex flex=row text-center text-6xl text-white p-4">
        <h1 className=' absolute w-full h-full items-center top-60 '>Welcome to ImapactGraph </h1>
        <p className='absolute w-full h-full top-80 text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi laboriosam accusantium, veniam pariatur animi amet nostrum labore nemo tenetur aspernatur praesentium quos dolores aperiam vero eveniet officia! Quibusdam, quisquam inventore!</p>
     </div>

     </div>
     </div>

  )
}

export default Hero
