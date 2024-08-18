import React from 'react'

const Hero = () => {
  return (


    <div className="hero min-h-screen">
        <video  className='w-full h-full object-cover' src='bg.mp4' autoPlay  
        loop muted />
        <div className="hero-overlay bg-opacity-30"></div>
        <div className="hero-content text-neutral-content text-center">
        <div className="w-full">
        <h1 className="mb-5 text-6xl font-bold">Welcome to ImapactGraph</h1>
        <p className="mb-5 text-2xl">
        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
        quasi. In deleniti eaque aut repudiandae et a id nisi.
        </p>

        <a href='/add'><button className="btn bg-white">Get Started </button></a>
    </div>
  </div>
</div>



  )
}

export default Hero
