import React from 'react'

const Add = () => {
  return (


    
    // <div className='bg-gray-50 h-screen flex  items-center' >
    //   <h1 className=' ml-20 mr-20 text-4xl'> Add Your Components Here !!</h1>

    //   <div className=" bg-white  rounded shadow-lg w-[500px] h-[600px] p-10">


    //           <label className="input input-bordered input-primary flex items-center gap-2">
    //             Name
    //             <input type="text" className="grow" placeholder="e.g. Database " />
    //           </label>

    //           <label className="input input-bordered input-primary  flex items-center gap-2 mt-10">
    //             ID
    //             <input type="Number" className="grow" placeholder="e.g. 01198 " />
    //           </label>

    //           <label className="input input-bordered input-primary flex items-center gap-2 mt-10">
    //             IP
    //             <input type="Number" className="grow" placeholder="e.g. 192.168.1.30 " />
    //           </label>

    //           <label className="input input-bordered input-primary  flex items-center gap-2 mt-10">
    //             Incoming Components
    //             <input type="text" className="grow" placeholder="e.g. Database " />
    //           </label>

    //           <label className="input input-bordered input-primary flex items-center gap-2 mt-10">
    //             Outgoing Components
    //             <input type="text" className="grow" placeholder="e.g. Database " />
    //           </label>

    //     <button className="btn btn-outline btn-wide btn-primary m-20 ">Add</button>


    // </div>
    // </div>






<div className="hero min-h-screen">
<video  className='w-full h-full object-cover' src='bg.mp4' autoPlay  
loop muted />


<div className="hero-overlay bg-opacity-30"></div>

<div className=" bg-white bg-opacity-50 rounded shadow-lg w-[500px] h-[600px] p-10">


<label className="input input-bordered input-black flex items-center gap-2">
  Name
  <input type="text" className="grow" placeholder="e.g. Database " />
</label>

<label className="input input-bordered input-black  flex items-center gap-2 mt-10">
  ID
  <input type="Number" min={0} className="grow" placeholder="e.g. 01198 " />
</label>

<label className="input input-bordered input-black flex items-center gap-2 mt-10">
  IP
  <input type="Number" min={0} className="grow" placeholder="e.g. 192.168.1.30 " />
</label>

<label className="input input-bordered input-black  flex items-center gap-2 mt-10">
  Incoming Components
  <input type="text" className="grow" placeholder="e.g. Database " />
</label>

<label className="input input-bordered input-black flex items-center gap-2 mt-10">
  Outgoing Components
  <input type="text" className="grow" placeholder="e.g. Database " />
</label>

<button className="btn btn-outline btn-wide btn-neutral m-20 ">Add</button>


</div>
<div className="hero-content text-neutral-content text-center">
</div>
</div>
  )
}

export default Add
