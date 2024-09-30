import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Toastmsg = () => {
  const showToastMessage = () => {
    toast.success("Success Notification !");
  };

  return (
    <div>
      <button onClick={showToastMessage}>Notify</button>
      <ToastContainer />
    </div>
  );
};
export default Toastmsg;
