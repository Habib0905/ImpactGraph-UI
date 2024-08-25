import React from 'react'

const Footer = () => {
  return (
    <div>
      <footer className="footer footer-center bg-pink-800 text-base-content p-5">
        <aside>
            <p className='text-white'>Copyright © {new Date().getFullYear()} - All right reserved by Data Science Department</p>
            <h1 className='text-xl text-white'>Product and Technology Division</h1>
            <img className=' w-40 h-30' src="bkash.png"></img>
        </aside>
       </footer>
    </div>
  )
}

export default Footer
