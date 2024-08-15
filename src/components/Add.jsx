import React from 'react'

const Add = () => {

  const modalview=() => {
    document.getElementById('modal'). showModal();
  }

  const deleteview =() => {
    document.getElementById('delete').showModal();
  }

  


  return (
    <div >
      <button className='btn btn-primary' onClick={modalview}> node A</button>

        <dialog id="modal" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <p className="py-4"> Name : Component A</p>
            <button className='btn btn-primary mr-10'>see Impacted nodes</button>
            <button className='btn btn-primary' onClick={deleteview}>Delete</button> 
          </div>
      </dialog>



      <dialog id="delete" className="modal">
          <div className="modal-box">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
            </form>
            <p className="py-4"> Do you want to delete the node ? </p>
            <button className='btn btn-primary mr-10'>see Impacted nodes</button>
            <button className='btn btn-primary' >Delete</button> 
          </div>
      </dialog>



    </div>
  )
}

export default Add
