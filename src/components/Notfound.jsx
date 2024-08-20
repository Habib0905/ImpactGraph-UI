import React from 'react'

const Notfound = () => {
  return (
    <div>
      <div className='hero min-h-screen mt-20 flex flex-col items-center'>
      <img className=" max-w-lg mr-2" src="404_animation.gif"></img>

      <p className=" text-center   text-4xl text-pink-900  p-2 mb-10 mx-auto font-abc font-bold">
          The Page you requested is not found.
        </p>
        <button className='btn btn-wide  bg-pink-900 text-white hover:text-pink-900'> Go Back </button>
      </div>
    </div>
  )
}

export default Notfound
